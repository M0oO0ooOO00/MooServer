import { pgEnum } from 'drizzle-orm/pg-core';
import { OAuthProvider } from '../../enums';

export const oauthProviderPgEnum = pgEnum(
    'oauth_provider',
    Object.values(OAuthProvider) as [string, ...string[]],
);
