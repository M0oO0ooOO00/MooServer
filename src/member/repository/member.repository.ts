import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Member } from '../domain/member.entity';
import { DATABASE_CONNECTION } from '../../common/db/constants/database-connection';

type Member = typeof Member.$inferSelect;

@Injectable()
export class MemberRepository {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly db: ReturnType<typeof drizzle>,
    ) {}

    async findAll(): Promise<Member[]> {
        return this.db.select().from(Member);
    }

    async findOne(id: number): Promise<Member | null> {
        const result = await this.db
            .select()
            .from(Member)
            .where(eq(Member.id, id))
            .limit(1);

        return result[0] ?? null;
    }

    async create(name: string, email: string): Promise<void> {
        try {
            await this.db.insert(Member).values({ name, email });
        } catch (error) {
            console.error('DB query error:', error);
            throw error;
        }
    }
}
