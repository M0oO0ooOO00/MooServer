import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from '../repository';
import { PagePaginationResponse, PaginationService } from '../../common';
import {
    GetMemberListResponse,
    GetMyProfileResponse,
    RecruitmentSummaryResponse,
    UpdateMyProfileRequest,
} from '../dto';
import { RecruitmentQueryResult } from '../type';
import { WarnService } from '../../warn/service';

@Injectable()
export class MemberService {
    private static readonly DEFAULT_PAGE_SIZE = 10;
    private static readonly DEFAULT_NICKNAME = '닉네임 없음';

    constructor(
        @Inject() private readonly memberRepository: MemberRepository,
        @Inject() private readonly paginationService: PaginationService,
        @Inject() private readonly warnService: WarnService,
    ) {}

    async findAllByPage(
        page: number = 1,
        pageSize: number = MemberService.DEFAULT_PAGE_SIZE,
    ) {
        const [membersWithDetails, totalMembersResult] = await Promise.all([
            this.memberRepository.findAllByPageWithDetails(page, pageSize),
            this.memberRepository.count(),
        ]);

        const totalMembers = this.extractTotalCount(totalMembersResult);
        const memberListResponses = this.mapToResponseDto(membersWithDetails);

        return this.createPaginationResponse(
            memberListResponses,
            page,
            pageSize,
            totalMembers,
        );
    }

    private extractTotalCount(totalMembersResult: { count: number }[]): number {
        return totalMembersResult[0]?.count || 0;
    }

    private mapToResponseDto(
        members: Awaited<
            ReturnType<typeof this.memberRepository.findAllByPageWithDetails>
        >,
    ): GetMemberListResponse[] {
        return members.map((member) => this.createMemberListResponse(member));
    }

    private createMemberListResponse(
        member: Awaited<
            ReturnType<typeof this.memberRepository.findAllByPageWithDetails>
        >[0],
    ): GetMemberListResponse {
        return new GetMemberListResponse(
            member.id,
            member.nickname || MemberService.DEFAULT_NICKNAME,
            member.warningCount,
            member.reportingCount,
            member.reportedCount,
            member.joinedAt,
            member.accountStatus,
        );
    }

    private createPaginationResponse(
        memberListResponses: GetMemberListResponse[],
        currentPage: number,
        pageSize: number,
        totalMembers: number,
    ): PagePaginationResponse<GetMemberListResponse[]> {
        return PagePaginationResponse.from(
            memberListResponses,
            currentPage,
            pageSize,
            totalMembers,
        );
    }

    async createMember(name: string, email: string) {
        // await this.memberRepository.create(name, email);
    }

    async findMemberDetailForAdmin(memberId: number) {
        const memberExists = await this.memberRepository.findOneById(memberId);
        if (!memberExists) {
            throw new NotFoundException('존재하지 않는 회원입니다.');
        }

        const [
            memberWithProfile,
            warnRecords,
            reportingRecords,
            reportedRecords,
            statistics,
        ] = await Promise.all([
            this.memberRepository.findMemberWithProfile(memberId),
            this.memberRepository.findWarnRecordsByMemberId(memberId),
            this.memberRepository.findReportingRecordsByMemberId(memberId),
            this.memberRepository.findReportedRecordsByMemberId(memberId),
            this.memberRepository.getMemberStatistics(memberId),
        ]);

        const result = memberWithProfile[0];
        if (!result) {
            throw new NotFoundException('회원 정보를 찾을 수 없습니다.');
        }

        return {
            member: result.member,
            profile: result.profile,
            warnRecords,
            reportingRecords,
            reportedRecords,
            statistics,
        };
    }

    async getMyProfile(memberId: number) {
        const memberWithProfile =
            await this.memberRepository.findMemberWithProfile(memberId);
        const memberWarn = await this.warnService.findByMemberId(memberId);

        const result = memberWithProfile[0];
        if (!result || !result.profile) {
            throw new NotFoundException('회원 정보를 찾을 수 없습니다.');
        }

        return GetMyProfileResponse.from(
            result.member,
            result.profile,
            memberWarn,
        );
    }

    async updateMyProfile(
        memberId: number,
        updateData: UpdateMyProfileRequest,
    ) {
        const updatedProfile = await this.memberRepository.updateProfile(
            memberId,
            updateData,
        );

        if (!updatedProfile) {
            return this.getMyProfile(memberId);
        }

        const [member, warns] = await Promise.all([
            this.memberRepository.findOneById(memberId),
            this.warnService.findByMemberId(memberId),
        ]);

        if (!member) {
            throw new NotFoundException('회원 정보를 찾을 수 없습니다.');
        }

        return GetMyProfileResponse.from(member, updatedProfile, warns);
    }

    async getMyScrappedRecruitments(
        memberId: number,
        page: number = 1,
        pageSize: number = PaginationService.getDefaultRecruitmentPageSize(),
    ): Promise<PagePaginationResponse<RecruitmentSummaryResponse[]>> {
        return this.getMyRecruitments(
            (memberId, page, pageSize) =>
                this.memberRepository.findScrappedRecruitmentsByMemberId(
                    memberId,
                    page,
                    pageSize,
                ),
            (memberId) =>
                this.memberRepository.countScrappedRecruitmentsByMemberId(
                    memberId,
                ),
            memberId,
            page,
            pageSize,
        );
    }

    async getMyWrittenRecruitments(
        memberId: number,
        page: number = 1,
        pageSize: number = PaginationService.getDefaultRecruitmentPageSize(),
    ): Promise<PagePaginationResponse<RecruitmentSummaryResponse[]>> {
        return this.getMyRecruitments(
            (memberId, page, pageSize) =>
                this.memberRepository.findWrittenRecruitmentsByMemberId(
                    memberId,
                    page,
                    pageSize,
                ),
            (memberId) =>
                this.memberRepository.countWrittenRecruitmentsByMemberId(
                    memberId,
                ),
            memberId,
            page,
            pageSize,
        );
    }

    async getMyParticipatedRecruitments(
        memberId: number,
        page: number = 1,
        pageSize: number = PaginationService.getDefaultRecruitmentPageSize(),
    ): Promise<PagePaginationResponse<RecruitmentSummaryResponse[]>> {
        return this.getMyRecruitments(
            (memberId, page, pageSize) =>
                this.memberRepository.findParticipatedRecruitmentsByMemberId(
                    memberId,
                    page,
                    pageSize,
                ),
            (memberId) =>
                this.memberRepository.countParticipatedRecruitmentsByMemberId(
                    memberId,
                ),
            memberId,
            page,
            pageSize,
        );
    }

    private async getMyRecruitments(
        findFunction: (
            memberId: number,
            page: number,
            pageSize: number,
        ) => Promise<RecruitmentQueryResult[]>,
        countFunction: (memberId: number) => Promise<number>,
        memberId: number,
        page: number,
        pageSize: number,
    ): Promise<PagePaginationResponse<RecruitmentSummaryResponse[]>> {
        const [recruitments, totalCount] = await Promise.all([
            findFunction(memberId, page, pageSize),
            countFunction(memberId),
        ]);

        const responses = recruitments.map((recruitment, index) =>
            RecruitmentSummaryResponse.create(index, page, pageSize, {
                ...recruitment,
                authorNickname:
                    recruitment.authorNickname ||
                    MemberService.DEFAULT_NICKNAME,
                gameDateTime: recruitment.gameDateTime,
            }),
        );

        return this.paginationService.createResponse(
            responses,
            page,
            pageSize,
            totalCount,
        );
    }
}
