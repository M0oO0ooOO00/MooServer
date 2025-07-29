import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';

export const Member = pgTable('member', {
    ...baseColumns,
    name: text('name').notNull(),
    email: text('email').notNull(),
});
