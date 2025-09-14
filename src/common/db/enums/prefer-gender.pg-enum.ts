import { pgEnum } from 'drizzle-orm/pg-core';
import { PreferGender } from '../../enums';

export const preferGenderPgEnum = pgEnum(
    'prefer_gender',
    Object.values(PreferGender) as [string, ...string[]],
);
