import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/log.interceptor';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './common/db/db.module';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './common/config/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
        DbModule,
        MemberModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    ],
})
export class AppModule {}
