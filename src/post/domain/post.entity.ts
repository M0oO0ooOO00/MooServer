import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common';
import { Member } from '../../member/domain';
import { relations } from 'drizzle-orm';
import { TipsDetail } from './tips-detail.entity';
import { RecruitmentDetail } from './recruitment-detail.entity';
import { PostImage } from './post-image.entity';
import { Scrap } from '../../scrap/domain';
import { Comment } from '../../comment/domain';
import { postTypePgEnum, postStatusPgEnum } from '../../common';

export { postStatusPgEnum, postTypePgEnum };

export const Post = pgTable('post', {
    ...baseColumns,
    title: text('title').notNull(),
    post_type: postTypePgEnum('post_type').notNull(),
    postStatus: postStatusPgEnum('post_status').notNull(),
    authorId: integer('author_id')
        .notNull()
        .references(() => Member.id),
});

export const postRelations = relations(Post, ({ one, many }) => ({
    author: one(Member, {
        fields: [Post.authorId],
        references: [Member.id],
    }),
    recruitmentDetail: one(RecruitmentDetail),
    tipsDetail: one(TipsDetail),
    postImage: many(PostImage),
    scrap: many(Scrap),
    comment: many(Comment),
}));
