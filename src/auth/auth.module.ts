import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies';
import { JwtAuthGuard } from './guards';
import { JwtModule } from '@nestjs/jwt';
import { MemberModule } from 'src/member/member.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategies/kakao.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
        MemberModule,
    ],
    providers: [JwtStrategy, JwtAuthGuard, AuthService, KakaoStrategy],
    exports: [JwtAuthGuard],
    controllers: [AuthController],
})
export class AuthModule {}
