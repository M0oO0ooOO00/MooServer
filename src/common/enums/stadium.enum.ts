export enum Stadium {
    JAMSIL = 'JAMSIL',
    GOCHEOK = 'GOCHEOK',
    MUNHAK = 'MUNHAK',
    SAJIK = 'SAJIK',
    DAEGU = 'DAEGU',
    GWANGJU = 'GWANGJU',
    CHANGWON = 'CHANGWON',
    DAEJEON = 'DAEJEON',
    SUWON = 'SUWON',
}

export const StadiumDescription = {
    [Stadium.JAMSIL]: '잠실야구장',
    [Stadium.GOCHEOK]: '고척스카이돔',
    [Stadium.MUNHAK]: '인천SSG랜더스필드',
    [Stadium.SAJIK]: '사직야구장',
    [Stadium.DAEGU]: '대구삼성라이온즈파크',
    [Stadium.GWANGJU]: '광주-기아챔피언스필드',
    [Stadium.CHANGWON]: '창원NC파크',
    [Stadium.DAEJEON]: '대전한화생명이글스파크',
    [Stadium.SUWON]: '수원KT위즈파크',
} as const;
