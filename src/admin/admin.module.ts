import { Module } from '@nestjs/common';
import { AdminService } from './service';
import { AdminController } from './controller';
import { MemberModule } from '../member/member.module';
import { PaginationService } from '../common/service/pagination.service';

@Module({
    imports: [MemberModule],
    controllers: [AdminController],
    providers: [AdminService, PaginationService],
})
export class AdminModule {}
