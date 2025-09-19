import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository';
import { OAuthProvider, Role } from '../common';

export interface KakaoOAuthMember {
    snsId: string;
    email: string;
    name: string;
    provider: OAuthProvider;
}

@Injectable()
export class AuthService {
    constructor(private readonly memberRepository: MemberRepository) {}

    async validateKakaoLogin(user: KakaoOAuthMember) {
        let member = await this.memberRepository.findOneByEmailAndProvider(
            user.email,
            user.provider,
        );

        member ??= await this.memberRepository.create(
            user.name,
            user.email,
            Role.USER,
            user.provider,
        );

        return member;
    }
}
