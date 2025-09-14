import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { MemberRepository } from '../repository';
import { PagePaginationResponse } from '../../common/response/page-pagination.response';
import { ReportRepository } from '../../report/repository';
import { GetMemberListResponse } from '../dto/response/get-member-list.response';
import { RecruitmentSummaryResponse } from '../dto/response/recruitment-summary.response';
import { PaginationService } from '../../common/service';
import { RecruitmentQueryResult } from '../type';


@Injectable()
export class MemberService {
    private static readonly DEFAULT_PAGE_SIZE = 10;
    private static readonly DEFAULT_NICKNAME = '닉네임 없음';

    constructor(
        @Inject() private readonly memberRepository: MemberRepository,
        @Inject() private readonly reportRepository: ReportRepository,
        @Inject() private readonly paginationService: PaginationService,
    ) {}

    async findAll() {
        return await this.memberRepository.findAll();
    }

    async findAllByPage(
        page: number,
        pageSize: number = MemberService.DEFAULT_PAGE_SIZE,
    ) {
        this.validatePageNumber(page);
        this.validatePageSize(pageSize);

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

    private validatePageNumber(page: number): void {
        if (page < 1) {
            throw new BadRequestException('페이지는 1보다 커야합니다.');
        }
    }

    private validatePageSize(pageSize: number): void {
        if (pageSize < 1 || pageSize > 100) {
            throw new BadRequestException(
                '페이지 크기는 1~100 사이여야 합니다.',
            );
        }
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

    async findOneById(id: number) {
        const memberById = await this.memberRepository.findOneById(id);
        const reportsByMemberId =
            await this.reportRepository.findByMemberId(id);
        if (!memberById) {
            throw new NotFoundException('존재하지 않는 회원입니다.');
        }
        return { ...memberById, reports: reportsByMemberId };
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

    async getMyScrappedRecruitments(
        memberId: number,
        page: number,
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
        page: number,
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
        page: number,
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
                gameDateTime: recruitment.gameDateTime.toISOString(),
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
