import { integer, pgTable } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';
import { Post } from './post.entity';
import { relations } from 'drizzle-orm';
import { stadiumPgEnum } from '../../common/db/enums/stadium.pg-enum';

export { stadiumPgEnum };

export const TipsDetail = pgTable('tips_detail', {
    ...baseColumns,
    stadium: stadiumPgEnum('stadium').notNull(),
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
