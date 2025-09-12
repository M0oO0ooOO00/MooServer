export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export const GenderDescription = {
    [Gender.MALE]: '남성',
    [Gender.FEMALE]: '여성',
    [Gender.OTHER]: '기타',
} as const;
