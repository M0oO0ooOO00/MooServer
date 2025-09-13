import { Module } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';
import { MemberModule } from '../member/member.module';

@Module({
    imports: [MemberModule],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}
