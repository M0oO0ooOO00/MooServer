import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { KakaoCallbackResponseDto } from './dto/kakao-callback.response.dto';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';

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
        }
    }
}
