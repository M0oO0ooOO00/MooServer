import { Inject, Injectable } from '@nestjs/common';
import { eq, count, sql, desc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Member } from '../domain';
import { Profile } from '../domain';
import { DATABASE_CONNECTION } from '../../common/db/constants/database-connection';
import { Report, ReportCount } from '../../report/domain';
import { Warn } from '../../admin/domain';
import { Post } from '../../post/domain';

type MemberType = typeof Member.$inferSelect;

@Injectable()
export class MemberRepository {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: ReturnType<typeof drizzle>,
    ) {}

    async findAll(): Promise<MemberType[]> {
        return this.db.select().from(Member);
    }

    async count(): Promise<{ count: number }[]> {
        return this.db.select({ count: count() }).from(Member);
    }

    async findOneById(id: number): Promise<MemberType | null> {
        const result = await this.db
            .select()
            .from(Member)
            .where(eq(Member.id, id))
            .limit(1);

        return result[0] ?? null;
    }

    async findAllByPageWithDetails(page: number, pageSize: number) {
        return this.db
            .select({
                id: Member.id,
                nickname: Profile.nickname,
                warningCount: sql<number>`COALESCE(COUNT(${Warn.id}), 0)::integer`,
                reportingCount: sql<number>`COALESCE(${ReportCount.reportingCount}, 0)`,
                reportedCount: sql<number>`COALESCE(${ReportCount.reportedCount}, 0)`,
                joinedAt: Member.createdAt,
            })
            .from(Member)
            .leftJoin(Profile, eq(Member.id, Profile.memberId))
            .leftJoin(Warn, eq(Member.id, Warn.memberId))
            .leftJoin(ReportCount, eq(Member.id, ReportCount.memberId))
            .groupBy(
                Member.id,
                Profile.nickname,
                ReportCount.reportingCount,
                ReportCount.reportedCount,
                Member.createdAt,
            )
            .limit(pageSize)
            .offset((page - 1) * pageSize);
    }

    async findMemberWithProfile(id: number) {
        return this.db
            .select({
                member: Member,
                profile: Profile,
            })
            .from(Member)
            .leftJoin(Profile, eq(Member.id, Profile.memberId))
            .where(eq(Member.id, id))
            .limit(1);
    }

    async findWarnRecordsByMemberId(memberId: number, limit: number = 3) {
        return this.db
            .select({
                warn: Warn,
                post: Post,
            })
            .from(Warn)
            .leftJoin(Post, eq(Warn.memberId, Post.authorId))
            .where(eq(Warn.memberId, memberId))
            .orderBy(desc(Warn.createdAt))
            .limit(limit);
    }

    async findReportingRecordsByMemberId(memberId: number, limit: number = 3) {
        return this.db
            .select({
                report: Report,
                reportedMember: Member,
                post: Post,
            })
            .from(Report)
            .innerJoin(Member, eq(Report.reportedId, Member.id))
            .leftJoin(Post, eq(Report.reportedId, Post.authorId))
            .where(eq(Report.reporterId, memberId))
            .orderBy(desc(Report.createdAt))
            .limit(limit);
    }

    async findReportedRecordsByMemberId(memberId: number, limit: number = 3) {
        return this.db
            .select({
                report: Report,
                reporterMember: Member,
                post: Post,
            })
            .from(Report)
            .innerJoin(Member, eq(Report.reporterId, Member.id))
            .leftJoin(Post, eq(Report.reportedId, Post.authorId))
            .where(eq(Report.reportedId, memberId))
            .orderBy(desc(Report.createdAt))
            .limit(limit);
    }

    async getMemberStatistics(memberId: number) {
        const warnCountResult = await this.db
            .select({
                count: sql<number>`COUNT(*)::integer`,
            })
            .from(Warn)
            .where(eq(Warn.memberId, memberId));

        const reportCountResult = await this.db
            .select({
                reportingCount: ReportCount.reportingCount,
                reportedCount: ReportCount.reportedCount,
            })
            .from(ReportCount)
            .where(eq(ReportCount.memberId, memberId))
            .limit(1);

        const totalWarnCount = warnCountResult[0]?.count || 0;
        const reportStats = reportCountResult[0];

        return {
            totalWarnCount,
            totalReportingCount: reportStats?.reportingCount || 0,
            totalReportedCount: reportStats?.reportedCount || 0,
        };
    }
}
