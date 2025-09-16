import { pgEnum } from 'drizzle-orm/pg-core';
import { PostStatusEnum } from '../../enums';

export const postStatusPgEnum = pgEnum(
    'post_status',
    Object.values(PostStatusEnum) as [string, ...string[]],
);
