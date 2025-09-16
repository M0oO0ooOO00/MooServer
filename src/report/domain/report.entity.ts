import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common';
import { relations } from 'drizzle-orm';
import { Member } from '../../member/domain';
import { reportTypePgEnum } from '../../common';

export { reportTypePgEnum };

export const Report = pgTable('report', {
    ...baseColumns,
    reportType: reportTypePgEnum('report_type'),
    content: text('content'),
    reporterId: integer('reporter_id')
        .notNull()
        .references(() => Member.id),
    reportedId: integer('reported_id')
        .notNull()
        .references(() => Member.id),
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
