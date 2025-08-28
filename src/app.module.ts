import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors';
import { HttpExceptionFilter } from './common/filters';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './common/db/db.module';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';
import { PostModule } from './post/post.module';
import { ParticipationModule } from './participation/participation.module';
import { ScrapModule } from './scrap/scrap.module';
import databaseConfig from './common/config/database.config';
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [path.resolve(process.cwd(), 'secret/.env')],
            isGlobal: true,
            load: [databaseConfig],
        }),
        DbModule,
        MemberModule,
        AuthModule,
        ReportModule,
        PostModule,
        ParticipationModule,
        ScrapModule,
    ],
    providers: [
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    ],
})
export class AppModule {}
