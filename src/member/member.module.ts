import { Module } from '@nestjs/common';
import { MemberService } from './service/member.service';
import { MemberController } from './controller/member.controller';
import { MemberRepository } from './repository/member.repository';
import { DbModule } from '../common/db/db.module';

@Module({
    imports: [DbModule],
    providers: [MemberService, MemberRepository],
    exports: [MemberService],
    controllers: [MemberController],
})
export class MemberModule {}
