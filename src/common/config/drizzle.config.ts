import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config(); // .env 파일 로드

export default {
    schema: './src/**/*.entity.ts',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        user: process.env.DB_USERNAME ?? '',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_NAME ?? '',
        ssl: false,
    },
} satisfies Config;
