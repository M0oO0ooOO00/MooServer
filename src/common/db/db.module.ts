import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

const client = new Client({
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    user: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? '',
});

const db = drizzle(client, { schema });

@Global()
@Module({
    providers: [
        {
            provide: 'DRIZZLE',
            useFactory: async () => {
                await client.connect();
                return db;
            },
        },
    ],
    exports: ['DRIZZLE'],
})
export class DbModule {}
