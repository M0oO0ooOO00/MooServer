import { pgEnum } from 'drizzle-orm/pg-core';
import { PostType } from '../../../post/enums/post-type.enum';

export const postTypePgEnum = pgEnum(
    'post_type',
    Object.values(PostType) as [string, ...string[]],
);
