import { pgEnum } from 'drizzle-orm/pg-core';
import { PostStatusEnum } from '../../enums';

export const statusPgEnum = pgEnum(
    'post_status',
    Object.values(PostStatusEnum) as [string, ...string[]],
);
