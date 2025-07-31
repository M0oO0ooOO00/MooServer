import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-kakao';
import { VerifyCallback } from 'passport-oauth2';

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
        console.log('🔥 validate 실행');
        console.log('profile:', JSON.stringify(profile, null, 2));

        const user = {
            snsId: profile.id,
            email: kakaoAccount?.email,
            name: kakaoAccount?.profile?.nickname,
            provider: 'kakao',
        };

        done(null, user);
    }
}
