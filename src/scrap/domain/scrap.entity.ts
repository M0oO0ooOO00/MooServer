import { integer, pgTable } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';
import { Member } from '../../member/domain';
import { Post } from '../../post/domain';
import { relations } from 'drizzle-orm';

export const Scrap = pgTable('scrap', {
    ...baseColumns,
    memberId: integer('member_id')
        .notNull()
        .references(() => Member.id),
    postId: integer('post_id')
        .notNull()
        .references(() => Post.id),
});

export const scrapRelations = relations(Scrap, ({ one }) => ({
    member: one(Member, {
        fields: [Scrap.memberId],
        references: [Member.id],
    }),
    post: one(Post, {
        fields: [Scrap.postId],
        references: [Post.id],
    }),
}));
