import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DATABASE_CONNECTION } from './constants/database-connection';
import * as schema from './schema';

@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                // const dbConfig = {
                //     host: configService.get<string>('DB_HOST'),
                //     port: configService.get<number>('DB_PORT'),
                //     user: configService.get<string>('DB_USERNAME'),
                //     password: configService.get<string>('DB_PASSWORD'),
                //     database: configService.get<string>('DB_NAME'),
                // };
                //
                // const client = new Client(dbConfig);
                //
                // await client.connect();
                //
                // return drizzle(client);
                const pool = new Pool({
                    connectionString: configService.getOrThrow('DATABASE_URL'),
                });
                return drizzle(pool, {
                    schema,
                });
            },
        },
    ],
    exports: [DATABASE_CONNECTION],
})
export class DbModule {
}
