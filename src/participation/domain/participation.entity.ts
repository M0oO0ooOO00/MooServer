import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';
import { recruitmentPgEnum } from '../../common/db/enums/recruitement-role.pg-enum';
import { Member } from '../../member/domain';
import { RecruitmentDetail } from '../../post/domain';
import { relations } from 'drizzle-orm';

export { recruitmentPgEnum };

export const Participation = pgTable('participation', {
    ...baseColumns,
    role: recruitmentPgEnum('role').notNull(),
    joinedAt: timestamp('joined_at').notNull(),
    memberId: integer('member_id')
        .notNull()
        .references(() => Member.id),
    recruitmentDetailId: integer('recruitment_detail_id')
        .notNull()
        .references(() => RecruitmentDetail.id),
});

export const participationRelations = relations(Participation, ({ one }) => ({
    member: one(Member, {
        fields: [Participation.memberId],
        references: [Member.id],
    }),
    recruitmentDetail: one(RecruitmentDetail, {
        fields: [Participation.memberId],
        references: [RecruitmentDetail.id],
    }),
}));
