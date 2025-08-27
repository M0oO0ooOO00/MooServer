import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';

@Injectable()
export class MemberService {
    constructor(
        @Inject() private readonly memberRepository: MemberRepository,
    ) {}

    async findAll() {
        return await this.memberRepository.findAll();
    }

    async findOneById(id: number) {
        const memberById = await this.memberRepository.findOne(id);
        if (!memberById) {
            throw new NotFoundException('존재하지 않는 회원입니다.');
        }
        return memberById;
    }

    async createMember(name: string, email: string) {
        // await this.memberRepository.create(name, email);
    }
}
