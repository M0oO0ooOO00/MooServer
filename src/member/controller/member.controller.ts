import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { MemberService } from '../service';
import { CreateMemberRequest } from '../dto/request/create-member.request';
import {
    CreateMemberSwagger,
    GetMembersByPageSwagger,
    GetMembersSwagger,
    GetMemberSwagger,
    GetScrappedRecruitmentsSwagger,
    GetWrittenRecruitmentsSwagger,
    GetParticipatedRecruitmentsSwagger,
    MemberControllerSwagger,
} from '../swagger';
import { GetMembersResponse } from '../dto/response/get-members.response';
import { GetMemberResponse } from '../dto/response/get-member.response';
import { RecruitmentSummaryResponse } from '../dto/response/recruitment-summary.response';
import { CurrentMember } from '../../common/decorators/current-member.decorator';
import { PagePaginationResponse } from '../../common/response/page-pagination.response';

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

    @Get('all')
    @GetMembersSwagger
    async getAllMembers() {
        const members = await this.memberService.findAll();
        return GetMembersResponse.from(members);
    }

    @Get()
    @GetMembersByPageSwagger
    async getMembersByPage(@Query('page', ParseIntPipe) page: number = 1) {
        return await this.memberService.findAllByPage(page);
    }

    @Get(':id')
    @GetMemberSwagger
    async getMemberById(@Param('id') id: number) {
        const memberById = await this.memberService.findOneById(id);
        return GetMemberResponse.from(memberById);
    }

    @Get('my/scrapped-recruitments')
    @GetScrappedRecruitmentsSwagger
    async getScrappedRecruitments(
        @CurrentMember() memberId: number,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize?: number,
    ) {
        return await this.memberService.getMyScrappedRecruitments(
            memberId,
            page,
            pageSize,
        );
    }

    @Get('my/written-recruitments')
    @GetWrittenRecruitmentsSwagger
    async getWrittenRecruitments(
        @CurrentMember() memberId: number,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize?: number,
    ) {
        return await this.memberService.getMyWrittenRecruitments(
            memberId,
            page,
            pageSize,
        );
    }

    @Get('my/participated-recruitments')
    @GetParticipatedRecruitmentsSwagger
    async getParticipatedRecruitments(
        @CurrentMember() memberId: number,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize?: number,
    ) {
        return await this.memberService.getMyParticipatedRecruitments(
            memberId,
            page,
            pageSize,
        );
    }
}
