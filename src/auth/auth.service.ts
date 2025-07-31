import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../member/member.repository';

interface KakaoOAuthMember {
    snsId: string;
    email: string;
    name: string;
    provider: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly memberRepository: MemberRepository) {}

    async validateKakaoLogin(user: KakaoOAuthMember) {
        const existingMember = await this.memberRepository.findOneByEmail(
            user.email,
        );

        if (existingMember) {
            return existingMember;
        }

        return this.memberRepository.create(user.name, user.email);
    }
}
