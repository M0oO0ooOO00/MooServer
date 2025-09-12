import { Module } from '@nestjs/common';
import { MemberService } from './service';
import { MemberController } from './controller/member.controller';
import { MemberRepository } from './repository';
import { DbModule } from '../common/db/db.module';
import { ReportModule } from '../report/report.module';

@Module({
    imports: [DbModule, ReportModule],
    providers: [MemberService, MemberRepository],
    exports: [MemberService],
    controllers: [MemberController],
})
export class MemberModule {}
