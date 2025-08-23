import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { baseColumns } from '../../common/db/base.entity';
import { Member } from '../../member/domain';
import { relations } from 'drizzle-orm';
import { TipsDetail } from './tips-detail.entity';
import { RecruitmentDetail } from './recruitment-detail.entity';
import { PostImage } from './post-image.entity';
import { Scrap } from '../../scrap/domain';
import { postTypePgEnum, statusPgEnum } from '../../common/db/enums';

export { statusPgEnum, postTypePgEnum };

export const Post = pgTable('post', {
    ...baseColumns,
    title: text('title').notNull(),
    post_type: postTypePgEnum('post_type').notNull(),
    status: statusPgEnum('status').notNull(),
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
}));
