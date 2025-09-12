import { Inject, Injectable } from '@nestjs/common';
import { eq, count, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Member } from '../domain';
import { Profile } from '../domain';
import { DATABASE_CONNECTION } from '../../common/db/constants/database-connection';
import { Report, ReportCount } from '../../report/domain';
import { Warn } from '../../admin/domain';

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
                warningCount: sql<number>`COALESCE((SELECT COUNT(*) FROM ${Warn} WHERE ${Warn.memberId} = ${Member.id}), 0)::integer`,
                reportingCount: sql<number>`COALESCE(${ReportCount.reportingCount}, 0)`,
                reportedCount: sql<number>`COALESCE(${ReportCount.reportedCount}, 0)`,
                joinedAt: Member.createdAt,
            })
            .from(Member)
            .leftJoin(Profile, eq(Member.id, Profile.memberId))
            .leftJoin(ReportCount, eq(Member.id, ReportCount.memberId))
            .limit(pageSize)
            .offset((page - 1) * pageSize);
    }
}
