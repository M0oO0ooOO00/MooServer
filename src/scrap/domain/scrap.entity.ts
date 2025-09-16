import { integer, pgTable, unique } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common';
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
}, (table) => ({
    uniqueMemberPost: unique().on(table.memberId, table.postId),
}));

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
