import { Test } from '@nestjs/testing';
import { MemberService } from '../service';
import { MemberRepository } from '../repository';

describe('MemberService', () => {
    let service: MemberService;

    const mockMemberRepository = {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MemberService,
                {
                    provide: MemberRepository,
                    useValue: mockMemberRepository,
                },
            ],
        }).compile();

        service = module.get(MemberService);
    });

    it('findOneById_success', async () => {
        const expected = {
            id: 1,
            name: 'John Doe',
            email: 'test@test.com',
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        mockMemberRepository.findOne.mockResolvedValue(expected);

        const result = await service.findOneById(1);

        expect(result).toEqual(expected);
        expect(mockMemberRepository.findOne).toHaveBeenCalledWith(1);
    });
});
