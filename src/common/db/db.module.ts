import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

@Module({
    providers: [
        {
            provide: 'DRIZZLE',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const client = new Client({
                    host: configService.get<string>('DB_HOST'),
                    port: configService.get<number>('DB_PORT'),
                    user: configService.get<string>('DB_USERNAME'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_NAME'),
                });

                await client.connect();

                return drizzle(client);
            },
        },
    ],
    exports: ['DRIZZLE'],
})
export class DbModule {}
