export enum OAuthProvider {
    GOOGLE = 'GOOGLE',
    KAKAO = 'KAKAO',
    NAVER = 'NAVER',
}

export const OAuthProviderDescription = {
    [OAuthProvider.GOOGLE]: '구글',
    [OAuthProvider.KAKAO]: '카카오',
    [OAuthProvider.NAVER]: '네이버',
} as const;
