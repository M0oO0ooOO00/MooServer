import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { sql } from 'drizzle-orm';
import { config } from 'dotenv';

// Load environment variables
config({ path: 'secret/.env' });

async function clearDatabase() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    const db = drizzle(pool, {
        logger: true,
    });

    try {
        console.log('🧹 Clearing database...');

        // Delete in reverse order of dependencies to avoid foreign key constraints
        await db.execute(sql`DELETE FROM warn`);
        console.log('✅ Cleared warns');

        await db.execute(sql`DELETE FROM report`);
        console.log('✅ Cleared reports');

        await db.execute(sql`DELETE FROM report_count`);
        console.log('✅ Cleared report_count');

        await db.execute(sql`DELETE FROM profile`);
        console.log('✅ Cleared profiles');

        await db.execute(sql`DELETE FROM member`);
        console.log('✅ Cleared members');

        // Reset sequences (optional, for clean ID numbering)
        await db.execute(sql`ALTER SEQUENCE warn_id_seq RESTART WITH 1`);
        await db.execute(sql`ALTER SEQUENCE report_id_seq RESTART WITH 1`);
        await db.execute(sql`ALTER SEQUENCE report_count_id_seq RESTART WITH 1`);
        await db.execute(sql`ALTER SEQUENCE profile_id_seq RESTART WITH 1`);
        await db.execute(sql`ALTER SEQUENCE member_id_seq RESTART WITH 1`);
        console.log('✅ Reset ID sequences');

        console.log('🎉 Database cleared successfully!');
    } catch (error) {
        console.error('❌ Failed to clear database:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

clearDatabase()
    .then(() => {
        console.log('Database clearing completed');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Database clearing failed:', err);
        process.exit(1);
    });