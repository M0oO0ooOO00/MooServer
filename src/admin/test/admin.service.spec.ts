import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../service/admin.service';
import { MemberService } from '../../member/service/member.service';

describe('AdminService', () => {
    let service: AdminService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminService,
                { provide: MemberService, useValue: {} },
            ],
        }).compile();

        service = module.get<AdminService>(AdminService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
