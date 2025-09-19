import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository';
import { OAuthProvider, Role } from '../common';
import { SignUpCompleteRequest } from './dto/request/sign-up.complete.request';

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

    async completeSignUp(signUpCompleteRequest: SignUpCompleteRequest) {
        const member = await this.memberRepository.findOneById(
            signUpCompleteRequest.memberId,
        );

        if (!member) {
            throw new NotFoundException('해당 멤버가 존재하지 않습니다.');
        }
        await this.memberRepository.updateTempMemberInfo(
            signUpCompleteRequest.memberId,
            signUpCompleteRequest.birthDate,
            signUpCompleteRequest.phoneNumber,
            signUpCompleteRequest.gender,
        );

        await this.memberRepository.createProfile(
            signUpCompleteRequest.memberId,
            signUpCompleteRequest.nickName,
            signUpCompleteRequest.supportTeam,
        );

        return member;
    }
}
