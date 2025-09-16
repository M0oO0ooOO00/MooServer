export enum AccountStatusEnum {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export const AccountStatusEnumDescription = {
    [AccountStatusEnum.ACTIVE]: '활성화',
    [AccountStatusEnum.INACTIVE]: '비활성화',
} as const;
