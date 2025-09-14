import { pgEnum } from 'drizzle-orm/pg-core';
import { TicketingType } from '../../enums/ticketing-type.enum';

export const ticketingTypePgEnum = pgEnum(
    'ticketing_type',
    Object.values(TicketingType) as [string, ...string[]],
);