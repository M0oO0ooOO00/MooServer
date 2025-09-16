import { Injectable } from '@nestjs/common';
import { WarnRepository } from '../repository';

@Injectable()
export class WarnService {
    constructor(private readonly warnRepository: WarnRepository) {}

    async findByMemberId(memberId: number) {
        return await this.warnRepository.findByMemberId(memberId);
    }
}
