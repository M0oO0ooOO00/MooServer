export enum PostStatusEnum {
    ACTIVE = 'ACTIVE',
    CLOSE = 'CLOSE',
    DELETED = 'DELETED',
    HIDDEN = 'HIDDEN',
    BLOCKED = 'BLOCKED',
    DRAFT = 'DRAFT',
}

export const StatusEnumDescription = {
    [PostStatusEnum.ACTIVE]: '활성화',
    [PostStatusEnum.CLOSE]: '마감',
    [PostStatusEnum.DELETED]: '삭제',
    [PostStatusEnum.HIDDEN]: '관리자에 의해 숨김처리',
    [PostStatusEnum.BLOCKED]: '신고로 인해 차단',
    [PostStatusEnum.DRAFT]: '임시저장',
} as const;
