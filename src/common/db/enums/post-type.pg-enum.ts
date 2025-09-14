import { pgEnum } from 'drizzle-orm/pg-core';
import { PostType } from '../../enums';

export const postTypePgEnum = pgEnum(
    'post_type',
    Object.values(PostType) as [string, ...string[]],
);
