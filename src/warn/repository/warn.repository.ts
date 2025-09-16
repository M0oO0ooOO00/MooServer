import { Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../common/db/constants';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Warn } from '../../admin/domain';
import { eq } from 'drizzle-orm';

export class WarnRepository {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: ReturnType<typeof drizzle>,
    ) {}

    findByMemberID(memberId: number) {
        return this.db.select().from(Warn).where(eq(Warn.memberId, memberId));
    }
}
