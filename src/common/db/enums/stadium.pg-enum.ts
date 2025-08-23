import { pgEnum } from 'drizzle-orm/pg-core';
import { Stadium } from '../../enums/stadium.enum';

export const stadiumPgEnum = pgEnum(
    'stadium',
    Object.values(Stadium) as [string, ...string[]],
);
