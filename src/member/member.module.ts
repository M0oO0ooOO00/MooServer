import { Module } from '@nestjs/common';
import { MemberService } from './service';
import { MemberController } from './controller';
import { MemberRepository } from './repository';
import { DbModule } from '../common/db/db.module';
import { ReportModule } from '../report/report.module';
import { PaginationService } from '../common/service';

@Module({
    imports: [DbModule, ReportModule],
    providers: [MemberService, MemberRepository, PaginationService],
    exports: [MemberService],
    controllers: [MemberController],
})
export class MemberModule {}
