import { integer, pgTable } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';
import { Member } from '../../member/domain/member.entity';
import { relations } from 'drizzle-orm';

export const ReportCount = pgTable('report_count', {
    ...baseColumns,
    reporting_count: integer().notNull().default(0),
    reported_count: integer().notNull().default(0),
    memberId: integer('member_id').references(() => Member.id),
});

export const reportCountRelations = relations(ReportCount, ({ one }) => ({
    Member: one(Member, {
        fields: [ReportCount.memberId],
        references: [Member.id],
    }),
}));
