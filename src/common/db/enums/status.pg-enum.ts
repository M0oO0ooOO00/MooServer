import { pgEnum } from 'drizzle-orm/pg-core';
import { StatusEnum } from '../../enums/status.enum';

export const StatusPgEnum = pgEnum(
    'status',
    Object.values(StatusEnum) as [string, ...string[]],
);
