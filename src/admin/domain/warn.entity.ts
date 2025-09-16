import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common';
import { Member } from '../../member/domain';
import { relations } from 'drizzle-orm';

export const Warn = pgTable('warn', {
    ...baseColumns,
    reason: text('reason').notNull(),
    memberId: integer('member_id')
        .notNull()
        .references(() => Member.id),
});

export const warnRelations = relations(Warn, ({ one }) => ({
    member: one(Member, {
        fields: [Warn.memberId],
        references: [Member.id],
    }),
}));
