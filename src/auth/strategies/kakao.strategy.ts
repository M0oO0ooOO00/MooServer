import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-kakao';
import { VerifyCallback } from 'passport-oauth2';
import { OAuthProvider } from '../../common';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(configService: ConfigService) {
        super({
            clientID: configService.get<string>('KAKAO_CLIENT_ID')!,
            clientSecret:
                configService.get<string>('KAKAO_CLIENT_SECRET') ?? '',
            callbackURL: configService.get<string>('KAKAO_CALLBACK_URL')!,
        });
    }

    validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ) {
        const kakaoAccount = profile._json.kakao_account;

        const user = {
            snsId: profile.id,
            email: kakaoAccount?.email,
            name: kakaoAccount?.profile?.nickname,
            provider: OAuthProvider.KAKAO,
        };

        done(null, user);
    }
}
