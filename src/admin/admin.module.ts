import { Module } from '@nestjs/common';
import { AdminService } from './service';
import { AdminController } from './controller';
import { MemberModule } from '../member/member.module';
import { PaginationService } from '../common';
import { WarnModule } from '../warn/warn.module';

@Module({
    imports: [MemberModule, WarnModule],
    controllers: [AdminController],
    providers: [AdminService, PaginationService],
})
export class AdminModule {}
