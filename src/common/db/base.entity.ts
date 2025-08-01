import { boolean, serial, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const baseColumns = {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { mode: 'date' }).default(sql`now()`),
    updatedAt: timestamp('updated_at', { mode: 'date' }).default(sql`now()`),
    deleted: boolean('deleted').default(false),
};
