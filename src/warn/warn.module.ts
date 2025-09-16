import { Module } from '@nestjs/common';
import { WarnService } from './service';
import { WarnRepository } from './repository';
import { DbModule } from '../common/db/db.module';

@Module({
    imports: [DbModule],
    providers: [WarnService, WarnRepository],
    exports: [WarnService],
})
export class WarnModule {}