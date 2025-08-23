import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseColumns } from '../../common/db/base.entity';
import { Profile } from './profile.entity';
import { ReportCount } from '../../report/domain';
import { Report } from '../../report/domain';
import { Post } from '../../post/domain';
import { Participation } from '../../participation/domain';
import { Scrap } from '../../scrap/domain';
import { rolePgEnum } from '../../common/db/enums';

export { rolePgEnum };

export const Member = pgTable('member', {
    ...baseColumns,
    name: text('name').notNull(),
    email: text('email').notNull(),
    birthDate: text('birth_date').notNull(),
    phoneNumber: text('phone_number'),
    role: rolePgEnum('role').notNull(),
});

export const memberRelations = relations(Member, ({ one, many }) => ({
    profile: one(Profile),
    post: many(Post),
    reportCount: many(ReportCount),
    reporter: many(Report, { relationName: 'reporter' }),
    reported: many(Report, { relationName: 'reported' }),
    participation: many(Participation),
    scrap: many(Scrap),
}));
