import {
    createParamDecorator,
    ExecutionContext,
    NotFoundException,
} from '@nestjs/common';

export const CurrentMember = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): number => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.memberId) {
            throw new NotFoundException(
                '로그인한 회원 정보를 찾을 수 없습니다.',
            );
        }

        return user.memberId;
    },
);
