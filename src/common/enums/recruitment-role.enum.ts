export enum RecruitmentRoleEnum {
    HOST = 'HOST',
    PARTICIPANT = 'PARTICIPANT',
}

export const RoleDescription = {
    [RecruitmentRoleEnum.HOST]: '주최자',
    [RecruitmentRoleEnum.PARTICIPANT]: '참가자',
} as const;
