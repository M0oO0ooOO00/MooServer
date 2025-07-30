import { Inject, Injectable } from '@nestjs/common';
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
        return await this.memberRepository.findOne(id);
    }

    async createMember(name: string, email: string) {
        await this.memberRepository.create(name, email);
    }
}
