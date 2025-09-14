export enum RecruitmentRoleEnum {
    HOST = 'HOST',
    PARTICIPANT = 'PARTICIPANT',
}

export const RecruitmentRoleDescription = {
    [RecruitmentRoleEnum.HOST]: '주최자',
    [RecruitmentRoleEnum.PARTICIPANT]: '참가자',
} as const;
