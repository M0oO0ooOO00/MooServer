export enum ReportType {
    SPAM = 'SPAM',
    HARASSMENT = 'HARASSMENT',
    INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT',
    FRAUD = 'FRAUD',
    VIOLATION_OF_RULES = 'VIOLATION_OF_RULES',
    OTHER = 'OTHER',
}

export const ReportTypeDescription = {
    [ReportType.SPAM]: '스팸/도배',
    [ReportType.HARASSMENT]: '괴롭힘/혐오',
    [ReportType.INAPPROPRIATE_CONTENT]: '부적절한 내용',
    [ReportType.FRAUD]: '사기/허위 정보',
    [ReportType.VIOLATION_OF_RULES]: '규칙 위반',
    [ReportType.OTHER]: '기타',
} as const;
