import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Member, Profile } from '../../../member/domain';
import { Report } from '../../../report/domain';
import { ReportCount } from '../../../report/domain';
import { Warn } from '../../../admin/domain';
import { Role } from '../../enums/role.enum';
import { Gender } from '../../enums/gender.enum';
import { Team } from '../../enums/team.enum';
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
        logger: true,
    });

    console.log('🌱 Seeding database...');

    // 1. 다양한 권한을 가진 50명의 회원 생성
    const memberData: InferInsertModel<typeof Member>[] = [];
    for (let i = 1; i <= 50; i++) {
        const role = i <= 5 ? Role.ADMIN : Role.USER; // 첫 5명은 관리자
        const gender = getRandomElement([
            Gender.MALE,
            Gender.FEMALE,
            Gender.OTHER,
        ]);
        memberData.push({
            name: `User${i}`,
            email: `user${i}@example.com`,
            birthDate: `199${Math.floor(Math.random() * 10)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            phoneNumber: `010-${1000 + Math.floor(Math.random() * 9000)}-${1000 + Math.floor(Math.random() * 9000)}`,
            gender,
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

    // 2. 각 회원에 대한 프로필 생성
    const profileData: InferInsertModel<typeof Profile>[] = insertedMembers.map(
        (member, index) => {
            const supportTeam =
                Math.random() > 0.2
                    ? getRandomElement(Object.values(Team))
                    : null; // 80% 확률로 응원팀 설정
            return {
                nickname: `${member.name}_nickname`,
                supportTeam,
                memberId: member.id,
                createdAt: getRandomDate(new Date('2024-01-01'), new Date()),
                updatedAt: getRandomDate(new Date('2024-01-01'), new Date()),
            };
        },
    );

    const insertedProfiles = await db
        .insert(Profile)
        .values(profileData)
        .returning();
    console.log(`✅ Created ${insertedProfiles.length} profiles`);

    // 3. 각 회원에 대한 신고 횟수 생성
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

    // 4. 신고 생성 (회원 간의 관계)
    const reportData: InferInsertModel<typeof Report>[] = [];
    for (let i = 0; i < 80; i++) {
        // 80개의 신고 생성
        const reporter = getRandomElement(insertedMembers);
        let reported = getRandomElement(insertedMembers);

        // 신고자와 피신고자가 다른지 확인
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

    // 5. 경고 생성 (일부 회원에게만)
    const warnData: InferInsertModel<typeof Warn>[] = [];
    const membersToWarn = insertedMembers.filter(() => Math.random() < 0.4); // 40% 회원이 경고 받음

    for (const member of membersToWarn) {
        const numberOfWarns = Math.floor(Math.random() * 3) + 1; // 회원당 1-3개 경고
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
        `   - Members: ${insertedMembers.length} (${insertedMembers.filter((m) => m.role === 'ADMIN').length} admins, ${insertedMembers.filter((m) => m.role === 'USER').length} users)`,
    );
    console.log(`   - Profiles: ${insertedProfiles.length}`);
    console.log(`   - Report Counts: ${insertedReportCounts.length}`);
    console.log(`   - Reports: ${insertedReports.length}`);
    console.log(`   - Warns: ${insertedWarns.length}`);

    // 데이터베이스 연결 종료
    await pool.end();
}
