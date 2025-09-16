import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { MemberService } from '../service';
import { CreateMemberRequest, UpdateMyProfileRequest } from '../dto';
import {
    CreateMemberSwagger,
    GetMyProfileSwagger,
    GetScrappedRecruitmentsSwagger,
    GetWrittenRecruitmentsSwagger,
    GetParticipatedRecruitmentsSwagger,
    UpdateMyProfileSwagger,
    MemberControllerSwagger,
} from '../swagger';
import { CurrentMember, PaginationQueryDto } from '../../common';

@Controller('member')
@MemberControllerSwagger
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post()
    @CreateMemberSwagger
    async signUp(@Body() createMemberDto: CreateMemberRequest) {
        const { name, email } = createMemberDto;
        // TODO : 바뀐 엔티티에 따라 다시 만들어야 함.
        await this.memberService.createMember(name, email);
    }

    @Get('my')
    @GetMyProfileSwagger
    async getMyInfo(@CurrentMember() memberId: number) {
        return await this.memberService.getMyProfile(memberId);
    }

    @Put('my')
    @UpdateMyProfileSwagger
    async updateMyProfile(
        @CurrentMember() memberId: number,
        @Body() updateProfileDto: UpdateMyProfileRequest,
    ) {
        return await this.memberService.updateMyProfile(
            memberId,
            updateProfileDto,
        );
    }

    @Get('my/scrapped-recruitments')
    @GetScrappedRecruitmentsSwagger
    async getScrappedRecruitments(
        @CurrentMember() memberId: number,
        @Query() paginationQuery: PaginationQueryDto,
    ) {
        return await this.memberService.getMyScrappedRecruitments(
            memberId,
            paginationQuery.page,
            paginationQuery.pageSize,
        );
    }

    @Get('my/written-recruitments')
    @GetWrittenRecruitmentsSwagger
    async getWrittenRecruitments(
        @CurrentMember() memberId: number,
        @Query() paginationQuery: PaginationQueryDto,
    ) {
        return await this.memberService.getMyWrittenRecruitments(
            memberId,
            paginationQuery.page,
            paginationQuery.pageSize,
        );
    }

    @Get('my/participated-recruitments')
    @GetParticipatedRecruitmentsSwagger
    async getParticipatedRecruitments(
        @CurrentMember() memberId: number,
        @Query() paginationQuery: PaginationQueryDto,
    ) {
        return await this.memberService.getMyParticipatedRecruitments(
            memberId,
            paginationQuery.page,
            paginationQuery.pageSize,
        );
    }
}
