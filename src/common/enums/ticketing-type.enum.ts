export enum TicketingType {
    SEPARATE = 'SEPARATE',
    TOGETHER = 'TOGETHER',
    FLEXIBLE = 'FLEXIBLE',
}

export const TicketingTypeDescription = {
    [TicketingType.SEPARATE]: '각자 예매',
    [TicketingType.TOGETHER]: '함께 예매',
    [TicketingType.FLEXIBLE]: '상황에 따라',
} as const;