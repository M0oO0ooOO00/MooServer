export enum StatusEnum {
    ACTIVE = 'ACTIVE',
    CLOSE = 'CLOSE',
    DELETED = 'DELETED',
    HIDDEN = 'HIDDEN',
    BLOCKED = 'BLOCKED',
    DRAFT = 'DRAFT',
}

export const StatusEnumDescription = {
    [StatusEnum.ACTIVE]: '활성화',
    [StatusEnum.CLOSE]: '마감',
    [StatusEnum.DELETED]: '삭제',
    [StatusEnum.HIDDEN]: '관리자에 의해 숨김처리',
    [StatusEnum.BLOCKED]: '신고로 인해 차단',
    [StatusEnum.DRAFT]: '임시저장',
} as const;
