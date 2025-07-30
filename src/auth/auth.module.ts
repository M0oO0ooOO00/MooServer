import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { MemberModule } from 'src/member/member.module';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
        MemberModule,
    ],
    providers: [JwtStrategy, JwtAuthGuard],
    exports: [JwtAuthGuard],
})
export class AuthModule {}
