export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export const RoleDescription = {
    [Role.ADMIN]: '관리자',
    [Role.USER]: '유저',
} as const;
