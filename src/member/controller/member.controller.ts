import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MemberService } from '../service/member.service';
import { CreateMemberRequest } from '../dto/request/create-member.request';
import {
    CreateMemberSwagger,
    GetMembersSwagger,
    GetMemberSwagger,
    MemberControllerSwagger,
} from '../swagger';

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
        return await this.memberService.findAll();
    }

    @Get(':id')
    @GetMemberSwagger
    async getMemberById(@Param('id') id: number) {
        return await this.memberService.findOneById(id);
    }
}
