export enum PostType {
    RECRUITMENT = 'RECRUITMENT',
    TIPS = 'TIPS',
}

export const PostTypeDescription = {
    [PostType.RECRUITMENT]: '직관메이트 모집',
    [PostType.TIPS]: '직관꿀팁',
} as const;
