import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Report } from '../domain';
import { eq } from 'drizzle-orm';

@Injectable()
export class ReportRepository {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: ReturnType<typeof drizzle>,
    ) {}

    async findByMemberId(memberId: number) {
        const [reportingRecords, reportedRecords] = await Promise.all([
            this.db
                .select()
                .from(Report)
                .where(eq(Report.reporterId, memberId)),
            this.db
                .select()
                .from(Report)
                .where(eq(Report.reportedId, memberId)),
        ]);

        return { reportingRecords, reportedRecords };
    }
}
