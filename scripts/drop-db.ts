import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'secret/.env' });

async function dropDatabase(): Promise<void> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('🗑️  Dropping all tables and types...');

        // 모든 테이블 드롭
        const tables = await client.query(`
            SELECT tablename FROM pg_tables 
            WHERE schemaname = 'public'
        `);

        for (const table of tables.rows) {
            await client.query(
                `DROP TABLE IF EXISTS "${table.tablename}" CASCADE`,
            );
            console.log(`📋 Dropped table: ${table.tablename}`);
        }

        // 모든 커스텀 타입 드롭 (enums)
        const types = await client.query(`
            SELECT typname FROM pg_type 
            WHERE typtype = 'e' AND typnamespace = (
                SELECT oid FROM pg_namespace WHERE nspname = 'public'
            )
        `);

        for (const type of types.rows) {
            await client.query(`DROP TYPE IF EXISTS "${type.typname}" CASCADE`);
            console.log(`🏷️  Dropped type: ${type.typname}`);
        }

        console.log('✅ Database cleanup complete!');
    } catch (error) {
        console.error(
            '❌ Error:',
            error instanceof Error ? error.message : error,
        );
        process.exit(1);
    } finally {
        await client.end();
    }
}

void dropDatabase();
