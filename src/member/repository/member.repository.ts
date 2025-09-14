import { Inject, Injectable } from '@nestjs/common';
import { eq, count, sql, desc, and } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Member } from '../domain';
import { Profile } from '../domain';
import { DATABASE_CONNECTION } from '../../common/db/constants';
import { Report, ReportCount } from '../../report/domain';
import { Warn } from '../../admin/domain';
import { Post, RecruitmentDetail } from '../../post/domain';
import { Scrap } from '../../scrap/domain';
import { Participation } from '../../participation/domain';

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

    async findScrappedRecruitmentsByMemberId(
        memberId: number,
        page: number,
        pageSize: number,
    ) {
        return this.db
            .select({
                title: Post.title,
                gameDate: sql<string>`TO_CHAR(${RecruitmentDetail.gameDate}, 'YYYY-MM-DD')`,
                gameDateTime: RecruitmentDetail.gameDate,
                teamHome: RecruitmentDetail.teamHome,
                teamAway: RecruitmentDetail.teamAway,
                authorNickname: sql<string>`COALESCE(${Profile.nickname}, '닉네임 없음')`,
                postStatus: Post.status,
                createdAt: Post.createdAt,
            })
            .from(Scrap)
            .innerJoin(Post, eq(Scrap.postId, Post.id))
            .innerJoin(RecruitmentDetail, eq(Post.id, RecruitmentDetail.postId))
            .innerJoin(Member, eq(Post.authorId, Member.id))
            .leftJoin(Profile, eq(Member.id, Profile.memberId))
            .where(
                and(
                    eq(Scrap.memberId, memberId),
                    eq(Post.post_type, 'RECRUITMENT'),
                ),
            )
            .orderBy(desc(Post.createdAt))
            .limit(pageSize)
            .offset((page - 1) * pageSize);
    }

    async findWrittenRecruitmentsByMemberId(
        memberId: number,
        page: number,
        pageSize: number,
    ) {
        return this.db
            .select({
                title: Post.title,
                gameDate: sql<string>`TO_CHAR(${RecruitmentDetail.gameDate}, 'YYYY-MM-DD')`,
                gameDateTime: RecruitmentDetail.gameDate,
                teamHome: RecruitmentDetail.teamHome,
                teamAway: RecruitmentDetail.teamAway,
                authorNickname: sql<string>`COALESCE(${Profile.nickname}, '닉네임 없음')`,
                postStatus: Post.status,
                createdAt: Post.createdAt,
            })
            .from(Post)
            .innerJoin(RecruitmentDetail, eq(Post.id, RecruitmentDetail.postId))
            .innerJoin(Member, eq(Post.authorId, Member.id))
            .leftJoin(Profile, eq(Member.id, Profile.memberId))
            .where(
                and(
                    eq(Post.authorId, memberId),
                    eq(Post.post_type, 'RECRUITMENT'),
                ),
            )
            .orderBy(desc(Post.createdAt))
            .limit(pageSize)
            .offset((page - 1) * pageSize);
    }

    async findParticipatedRecruitmentsByMemberId(
        memberId: number,
        page: number,
        pageSize: number,
    ) {
        return this.db
            .select({
                title: Post.title,
                gameDate: sql<string>`TO_CHAR(${RecruitmentDetail.gameDate}, 'YYYY-MM-DD')`,
                gameDateTime: RecruitmentDetail.gameDate,
                teamHome: RecruitmentDetail.teamHome,
                teamAway: RecruitmentDetail.teamAway,
                authorNickname: sql<string>`COALESCE(${Profile.nickname}, '닉네임 없음')`,
                postStatus: Post.status,
                createdAt: Post.createdAt,
            })
            .from(Participation)
            .innerJoin(
                RecruitmentDetail,
                eq(Participation.recruitmentDetailId, RecruitmentDetail.id),
            )
            .innerJoin(Post, eq(RecruitmentDetail.postId, Post.id))
            .innerJoin(Member, eq(Post.authorId, Member.id))
            .leftJoin(Profile, eq(Member.id, Profile.memberId))
            .where(eq(Participation.memberId, memberId))
            .orderBy(desc(Post.createdAt))
            .limit(pageSize)
            .offset((page - 1) * pageSize);
    }

    async countScrappedRecruitmentsByMemberId(
        memberId: number,
    ): Promise<number> {
        const result = await this.db
            .select({ count: count() })
            .from(Scrap)
            .innerJoin(Post, eq(Scrap.postId, Post.id))
            .where(
                and(
                    eq(Scrap.memberId, memberId),
                    eq(Post.post_type, 'RECRUITMENT'),
                ),
            );

        return result[0]?.count || 0;
    }

    async countWrittenRecruitmentsByMemberId(
        memberId: number,
    ): Promise<number> {
        const result = await this.db
            .select({ count: count() })
            .from(Post)
            .where(
                and(
                    eq(Post.authorId, memberId),
                    eq(Post.post_type, 'RECRUITMENT'),
                ),
            );

        return result[0]?.count || 0;
    }

    async countParticipatedRecruitmentsByMemberId(
        memberId: number,
    ): Promise<number> {
        const result = await this.db
            .select({ count: count() })
            .from(Participation)
            .innerJoin(
                RecruitmentDetail,
                eq(Participation.recruitmentDetailId, RecruitmentDetail.id),
            )
            .innerJoin(Post, eq(RecruitmentDetail.postId, Post.id))
            .where(eq(Participation.memberId, memberId));

        return result[0]?.count || 0;
    }
}
