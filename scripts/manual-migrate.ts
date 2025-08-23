import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: 'secret/.env' });

async function manualMigrate(): Promise<void> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('🚀 수동 마이그레이션 진행...');

        const sqlFile = fs.readFileSync('drizzle/migrations/0000_clean_richard_fisk.sql', 'utf-8');
        const statements = sqlFile.split('--> statement-breakpoint').filter(s => s.trim());

        for (const statement of statements) {
            const sql = statement.trim();
            if (sql) {
                try {
                    await client.query(sql);
                    console.log('✅ Executed:', sql.split('\n')[0]);
                } catch (error) {
                    console.log('⚠️  Skipped statement due to error:', sql.split('\n')[0], error.message);
                }
            }
        }

        console.log('🎉 수동 마이그레이션 성공!');
    } catch (error) {
        console.error('❌ Error:', error instanceof Error ? error.message : error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

void manualMigrate();