import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';
import { postStatusPgEnum } from '../../common/db/enums';
import { Member } from '../../member/domain';
import { Post } from '../../post/domain';
import { relations } from 'drizzle-orm';

export { postStatusPgEnum };
export const Comment = pgTable('comment', {
    ...baseColumns,
    content: text('content').notNull(),
    postStatus: postStatusPgEnum('post_status').notNull(),
    authorId: integer('author_id')
        .notNull()
        .references(() => Member.id),
    postId: integer('post_id')
        .notNull()
        .references(() => Post.id),
});

export const commentRelations = relations(Comment, ({ one }) => ({
    author: one(Member, {
        fields: [Comment.authorId],
        references: [Member.id],
    }),
    post: one(Post, {
        fields: [Comment.postId],
        references: [Post.id],
    }),
}));
