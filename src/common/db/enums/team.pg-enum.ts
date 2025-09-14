import { pgEnum } from 'drizzle-orm/pg-core';
import { Team } from '../../enums/team.enum';

export const teamPgEnum = pgEnum(
    'team',
    Object.values(Team) as [string, ...string[]],
);