import { pgEnum } from 'drizzle-orm/pg-core';
import { Gender } from '../../enums/gender.enum';

export const genderPgEnum = pgEnum(
    'gender',
    Object.values(Gender) as [string, ...string[]],
);
