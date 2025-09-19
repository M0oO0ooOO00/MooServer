import { Module } from '@nestjs/common';
import { MemberService } from './service';
import { MemberController } from './controller';
import { MemberRepository } from './repository';
import { DbModule } from '../common/db/db.module';
import { ReportModule } from '../report/report.module';
import { PaginationService } from '../common/service';
import { WarnModule } from '../warn/warn.module';

@Module({
    imports: [DbModule, ReportModule, WarnModule],
    providers: [MemberService, MemberRepository, PaginationService],
    exports: [MemberService, MemberRepository],
    controllers: [MemberController],
})
export class MemberModule {}
