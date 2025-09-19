import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { SignUpCompleteRequest } from './dto/request/sign-up.complete.request';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    @Get('kakao')
    @UseGuards(AuthGuard('kakao'))
    async kakaoLogin() {}

    @Get('kakao/callback')
    @UseGuards(AuthGuard('kakao'))
    async kakaoCallback(@Req() req, @Res() res) {
        const user = req.user;
        const member = await this.authService.validateKakaoLogin(user);

        if (member.signUpStatus === false) {
            // 최종 회원가입 안된 경우
            res.redirect(
                `${process.env.LOCAL_FRONT}/signup?memberId=${member.id}`,
            );
        } else {
            // 이미 회원가입이 완료된 계정의 경우
            // 토큰 만들고
            // 홈페이지 리다이렉트
            const accessToken = this.generateToken(member);
            return accessToken;
        }
    }

    @Post('signup')
    async completeSignUp(@Body() signUpCompleteRequest: SignUpCompleteRequest) {
        const member = await this.authService.completeSignUp(
            signUpCompleteRequest,
        );

        const accessToken = this.generateToken(member);

        return accessToken;
    }

    private generateToken(member) {
        const payload = { id: member.id, role: member.role };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1d',
        });

        return accessToken;
    }
}
