export enum Team {
    DOOSAN = 'DOOSAN',
    HANWHA = 'HANWHA',
    KIWOOM = 'KIWOOM',
    KIA = 'KIA',
    KT = 'KT',
    LG = 'LG',
    LOTTE = 'LOTTE',
    NC = 'NC',
    SAMSUNG = 'SAMSUNG',
    SSG = 'SSG',
}

export const TeamDescription = {
    [Team.DOOSAN]: '두산 베어스',
    [Team.HANWHA]: '한화 이글스',
    [Team.KIWOOM]: '키움 히어로즈',
    [Team.KIA]: 'KIA 타이거즈',
    [Team.KT]: 'KT 위즈',
    [Team.LG]: 'LG 트윈스',
    [Team.LOTTE]: '롯데 자이언츠',
    [Team.NC]: 'NC 다이노스',
    [Team.SAMSUNG]: '삼성 라이온즈',
    [Team.SSG]: 'SSG 랜더스',
} as const;
