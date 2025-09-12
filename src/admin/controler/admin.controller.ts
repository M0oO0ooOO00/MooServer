import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { AdminService } from '../service';
import { Roles } from '../../common/decorators';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards';
import { MemberService } from '../../member/service';

@Controller('admin')
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly memberService: MemberService,
    ) {}

    @Get('/members/:page')
    async getAllMembersByPage(@Param('page', ParseIntPipe) page: number) {
        return await this.memberService.findAllByPage(page);
    }

    @Get('/members/:id')
    async getMemberById(@Param('id', ParseIntPipe) id: number) {
        return await this.memberService.findOneById(id);
    }
}
