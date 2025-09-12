import { Role } from '../../common/enums/role.enum';

export type JwtPayload = {
    memberId: number;
    roles: Role[];
};
