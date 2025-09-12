import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from '../service';
import { MemberService } from '../../member/service';
import { MemberDetailResponse } from '../dto';
import {
    GetMemberDetailSwagger,
    GetMembersByPageSwagger,
    GetMemberByIdSwagger,
} from '../swagger';

@ApiTags('관리자')
@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly memberService: MemberService,
    ) {}

    @Get('/members')
    @GetMembersByPageSwagger
    async getAllMembersByPage(
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '10',
    ) {
        const pageNum = parseInt(page, 10);
        const pageSizeNum = parseInt(pageSize, 10);
        return await this.memberService.findAllByPage(pageNum, pageSizeNum);
    }

    @Get('/members/:id')
    @GetMemberByIdSwagger
    async getMemberById(@Param('id', ParseIntPipe) id: number) {
        return await this.memberService.findOneById(id);
    }

    @Get('/member-detail/:memberId')
    @GetMemberDetailSwagger
    async getMemberDetail(@Param('memberId', ParseIntPipe) memberId: number) {
        return await this.adminService.getMemberDetail(memberId);
    }
}
