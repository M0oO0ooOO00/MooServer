import { integer, pgTable } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common';
import { Member } from '../../member/domain';
import { relations } from 'drizzle-orm';

export const ReportCount = pgTable('report_count', {
    ...baseColumns,
    reportingCount: integer('reporting_count').notNull().default(0),
    reportedCount: integer('reported_count').notNull().default(0),
    memberId: integer('member_id')
        .notNull()
        .unique()
        .references(() => Member.id),
});

export const reportCountRelations = relations(ReportCount, ({ one }) => ({
    member: one(Member, {
        fields: [ReportCount.memberId],
        references: [Member.id],
    }),
}));
