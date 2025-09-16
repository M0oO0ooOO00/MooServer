import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common';
import { Post } from './post.entity';
import { relations } from 'drizzle-orm';

export const PostImage = pgTable('post_image', {
    ...baseColumns,
    imageUrl: text('image_url').notNull(),
    imageOrder: integer('image_order'),
    postId: integer('post_id')
        .notNull()
        .references(() => Post.id),
});

export const postImageRelations = relations(PostImage, ({ one }) => ({
    post: one(Post, {
        fields: [PostImage.postId],
        references: [Post.id],
    }),
}));
