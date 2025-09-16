import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from '../service';
import { MemberService } from '../../member/service';
import { PaginationQueryDto, RolesGuard, Roles, Role } from '../../common';
import { GetMemberByIdSwagger, GetMembersByPageSwagger } from '../swagger';

@ApiTags('관리자')
@Controller('admin')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly memberService: MemberService,
    ) {}

    @Get('/members')
    @GetMembersByPageSwagger
    async getAllMembersByPage(@Query() paginationQuery: PaginationQueryDto) {
        return await this.memberService.findAllByPage(
            paginationQuery.page,
            paginationQuery.pageSize,
        );
    }

    @Get('/members/:memberId')
    @GetMemberByIdSwagger
    async getMemberById(@Param('memberId', ParseIntPipe) memberId: number) {
        return await this.adminService.getMemberDetail(memberId);
    }
}
