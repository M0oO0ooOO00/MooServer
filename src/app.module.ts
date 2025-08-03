import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/log.interceptor';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './common/db/db.module';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
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
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    ],
})
export class AppModule {}
