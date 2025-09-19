import { boolean, pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseColumns } from '../../common/db/base.entity';
import { Profile } from './profile.entity';
import { ReportCount } from '../../report/domain';
import { Report } from '../../report/domain';
import { Post } from '../../post/domain';
import { Participation } from '../../participation/domain';
import { Scrap } from '../../scrap/domain';
import { Comment } from '../../comment/domain';
import { Warn } from '../../admin/domain';
import {
    rolePgEnum,
    genderPgEnum,
    oauthProviderPgEnum,
    accountStatusPgEnum,
} from '../../common/db/enums';
import { AccountStatusEnum } from '../../common';

export { rolePgEnum, genderPgEnum, oauthProviderPgEnum, accountStatusPgEnum };

export const Member = pgTable('member', {
    ...baseColumns,
    name: text('name').notNull(),
    email: text('email').notNull(),
    birthDate: text('birth_date'),
    phoneNumber: text('phone_number'),
    gender: genderPgEnum('gender'),
    role: rolePgEnum('role').notNull(),
    oauthProvider: oauthProviderPgEnum('oauth_provider').notNull(),
    accountStatus: accountStatusPgEnum('account_status')
        .notNull()
        .default(AccountStatusEnum.ACTIVE),
    signUpStatus: boolean('sign-up-status').default(false),
});

export const memberRelations = relations(Member, ({ one, many }) => ({
    profile: one(Profile),
    post: many(Post),
    comment: many(Comment),
    reportCount: one(ReportCount),
    reporter: many(Report, { relationName: 'reporter' }),
    reported: many(Report, { relationName: 'reported' }),
    participation: many(Participation),
    scrap: many(Scrap),
    warn: many(Warn),
}));
