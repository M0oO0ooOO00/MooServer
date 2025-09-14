import { Role } from '../../common/enums';

export type JwtPayload = {
    memberId: number;
    roles: Role[];
};
