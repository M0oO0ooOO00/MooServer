import { pgEnum } from 'drizzle-orm/pg-core';
import { StatusEnum } from '../../enums/status.enum';

export const statusPgEnum = pgEnum(
    'status',
    Object.values(StatusEnum) as [string, ...string[]],
);
