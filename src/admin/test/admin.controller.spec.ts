import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../controller/admin.controller';
import { AdminService } from '../service/admin.service';
import { MemberService } from '../../member/service/member.service';

describe('AdminController', () => {
    let controller: AdminController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AdminController],
            providers: [
                { provide: AdminService, useValue: {} },
                { provide: MemberService, useValue: {} },
            ],
        }).compile();

        controller = module.get<AdminController>(AdminController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
