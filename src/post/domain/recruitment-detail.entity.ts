import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';
import { relations } from 'drizzle-orm';
import { Post } from './post.entity';
import { Participation } from '../../participation/domain/participation.entity';

export const RecruitmentDetail = pgTable('recruitment_detail', {
    ...baseColumns,
    gameDate: timestamp('game_date', { mode: 'string' }).notNull(),
    gameTime: timestamp('game_time', { mode: 'string' }).notNull(),
    stadium: text('stadium').notNull(),
    teamHome: text('team_home').notNull(),
    teamAway: text('team_away').notNull(),
    supportTeam: text('support_team'),
    recruitmentLimit: integer('recruitment_limit').notNull().default(1),
    currentParticipants: integer('current_participants').notNull().default(0),
    preferGender: text('prefer_gender').notNull().default('ANY'), // enum
    message: text('message'),
    ticketingType: text('ticketing_type'), // 이것도 enum으로 처리할지 고민. 또는 텍스트로 걍 박음
    // my_preference: text('my_preferece'), 얘도 아직 미정
    postId: integer('post_id')
        .notNull()
        .unique()
        .references(() => Post.id),
});

export const recruitmentDetailsRelations = relations(
    RecruitmentDetail,
    ({ one, many }) => ({
        post: one(Post, {
            fields: [RecruitmentDetail.postId],
            references: [Post.id],
        }),
        participation: many(Participation),
    }),
);
