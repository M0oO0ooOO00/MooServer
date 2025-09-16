import { Role } from '../../common';

export type JwtPayload = {
    memberId: number;
    roles: Role[];
};
