import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Member } from '../../../member/domain';
import { Report } from '../../../report/domain';
import { ReportCount } from '../../../report/domain';
import { Warn } from '../../../admin/domain';
import { Role } from '../../enums/role.enum';
import type { InferInsertModel } from 'drizzle-orm';

const REPORT_TYPES = [
    '스팸/도배',
    '욕설/비방',
    '음란물',
    '사기/허위정보',
    '기타',
];

const WARN_REASONS = [
    '부적절한 게시물 작성',
    '허위 신고',
    '욕설 및 비방',
    '스팸 행위',
    '커뮤니티 규칙 위반',
];

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
}

export async function seeding() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });
    
    const db = drizzle(pool, {
        logger: true
    });

    console.log('🌱 Seeding database...');

    // 1. Create 50 Members with different roles
    const memberData: InferInsertModel<typeof Member>[] = [];
    for (let i = 1; i <= 50; i++) {
        const role = i <= 5 ? Role.ADMIN : Role.USER; // First 5 are admins
        memberData.push({
            name: `User${i}`,
            email: `user${i}@example.com`,
            birthDate: `199${Math.floor(Math.random() * 10)}-0${Math.floor(Math.random() * 9) + 1}-${10 + Math.floor(Math.random() * 20)}`,
            phoneNumber: `010-${1000 + Math.floor(Math.random() * 9000)}-${1000 + Math.floor(Math.random() * 9000)}`,
            role,
            createdAt: getRandomDate(new Date('2024-01-01'), new Date()),
            updatedAt: getRandomDate(new Date('2024-01-01'), new Date()),
        });
    }

    const insertedMembers = await db
        .insert(Member)
        .values(memberData)
        .returning();
    console.log(`✅ Created ${insertedMembers.length} members`);

    // 2. Create ReportCount for each member
    const reportCountData = insertedMembers.map((member) => ({
        memberId: member.id,
        reportingCount: Math.floor(Math.random() * 10),
        reportedCount: Math.floor(Math.random() * 5),
        createdAt: getRandomDate(new Date('2024-01-01'), new Date()),
        updatedAt: getRandomDate(new Date('2024-01-01'), new Date()),
    }));

    const insertedReportCounts = await db
        .insert(ReportCount)
        .values(reportCountData)
        .returning();
    console.log(`✅ Created ${insertedReportCounts.length} report counts`);

    // 3. Create Reports (relationships between members)
    const reportData: InferInsertModel<typeof Report>[] = [];
    for (let i = 0; i < 80; i++) {
        // Create 80 reports
        const reporter = getRandomElement(insertedMembers);
        let reported = getRandomElement(insertedMembers);

        // Make sure reporter and reported are different
        while (reported.id === reporter.id) {
            reported = getRandomElement(insertedMembers);
        }

        reportData.push({
            reportType: getRandomElement(REPORT_TYPES),
            content: `신고 내용 ${i + 1}: ${getRandomElement(REPORT_TYPES)}에 대한 신고입니다.`,
            reporterId: reporter.id,
            reportedId: reported.id,
            createdAt: getRandomDate(new Date('2024-01-01'), new Date()),
            updatedAt: getRandomDate(new Date('2024-01-01'), new Date()),
        });
    }

    const insertedReports = await db
        .insert(Report)
        .values(reportData)
        .returning();
    console.log(`✅ Created ${insertedReports.length} reports`);

    // 4. Create Warns (only for some members)
    const warnData: InferInsertModel<typeof Warn>[] = [];
    const membersToWarn = insertedMembers.filter(() => Math.random() < 0.4); // 40% of members get warns

    for (const member of membersToWarn) {
        const numberOfWarns = Math.floor(Math.random() * 3) + 1; // 1-3 warns per member
        for (let i = 0; i < numberOfWarns; i++) {
            warnData.push({
                reason: getRandomElement(WARN_REASONS),
                memberId: member.id,
                createdAt: getRandomDate(new Date('2024-01-01'), new Date()),
                updatedAt: getRandomDate(new Date('2024-01-01'), new Date()),
            });
        }
    }

    const insertedWarns = await db.insert(Warn).values(warnData).returning();
    console.log(`✅ Created ${insertedWarns.length} warns`);

    console.log('🎉 Seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(
        `   - Members: ${insertedMembers.length} (${insertedMembers.filter((m) => m.role === Role.ADMIN).length} admins, ${insertedMembers.filter((m) => m.role === Role.USER).length} users)`,
    );
    console.log(`   - Report Counts: ${insertedReportCounts.length}`);
    console.log(`   - Reports: ${insertedReports.length}`);
    console.log(`   - Warns: ${insertedWarns.length}`);
    
    // Close the database connection
    await pool.end();
}
