export enum PreferGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    ANY = 'ANY',
}

export const PreferGenderDescription = {
    [PreferGender.MALE]: '남성 선호',
    [PreferGender.FEMALE]: '여성 선호',
    [PreferGender.ANY]: '성별 무관',
} as const;
