import { integer, pgEnum, pgTable } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';
import { Stadium } from '../../common/enums/stadium.enum';
import { Post } from './post.entity';
import { relations } from 'drizzle-orm';

export const stadiumEnum = pgEnum(
    'stadium',
    Object.values(Stadium) as [string, ...string[]],
);

export const TipsDetail = pgTable('tips_detail', {
    ...baseColumns,
    stadium: stadiumEnum('stadium').notNull(),
    postId: integer('post_id')
        .notNull()
        .unique()
        .references(() => Post.id),
});

export const tipsDetailsRelations = relations(TipsDetail, ({ one }) => ({
    post: one(Post, {
        fields: [TipsDetail.postId],
        references: [Post.id],
    }),
}));
