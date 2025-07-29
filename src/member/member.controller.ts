import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post()
    async signUp(@Body() createMemberDto: CreateMemberDto) {
        const { name, email } = createMemberDto;

        await this.memberService.createMember(name, email);
    }

    @Get('all')
    async getAllMembers() {
        return await this.memberService.findAll();
    }

    @Get(':id')
    async getMemberById(@Param('id') id: number) {
        return await this.memberService.findOneById(id);
    }
}
