import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'secret/.env' });

async function checkDatabase(): Promise<void> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('🔍 Checking database state...');

        // 현재 존재하는 모든 테이블 확인
        const tables = await client.query(`
            SELECT tablename
            FROM pg_tables
            WHERE schemaname = 'public'
        `);
        console.log(
            '📋 Tables:',
            tables.rows.map((r) => r.tablename),
        );

        // 모든 타입 확인
        const types = await client.query(`
            SELECT typname FROM pg_type 
            WHERE typtype = 'e' AND typnamespace = (
                SELECT oid FROM pg_namespace WHERE nspname = 'public'
            )
        `);
        console.log(
            '🏷️  Types:',
            types.rows.map((r) => r.typname),
        );
    } catch (error) {
        console.error(
            '❌ Error:',
            error instanceof Error ? error.message : error,
        );
    } finally {
        await client.end();
    }
}

void checkDatabase();
