import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';
import { relations } from 'drizzle-orm';
import { Member } from '../../member/domain/member.entity';

export const Report = pgTable('report', {
    ...baseColumns,
    reportType: text('report_type'),
    content: text('content'),
    reporterId: integer('reporter_id').references(() => Member.id),
    reportedId: integer('reported_id').references(() => Member.id),
});

export const reportRelations = relations(Report, ({ one }) => ({
    reporter: one(Member, {
        fields: [Report.reporterId],
        references: [Member.id],
        relationName: 'reporter',
    }),
    reported: one(Member, {
        fields: [Report.reportedId],
        references: [Member.id],
        relationName: 'reported',
    }),
}));
