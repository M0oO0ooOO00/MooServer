import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../auth/types';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): number => {
        const req = ctx.switchToHttp().getRequest();
        const { memberId } = req.user as JwtPayload;
        return memberId;
    },
);
