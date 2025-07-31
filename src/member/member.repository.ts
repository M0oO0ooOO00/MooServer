import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Member } from './domain/member.entity';

type Member = typeof Member.$inferSelect;

@Injectable()
export class MemberRepository {
    constructor(
        @Inject('DRIZZLE') private readonly db: ReturnType<typeof drizzle>,
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

    async findOneByEmail(email: string): Promise<Member> {
        const result = await this.db
            .select()
            .from(Member)
            .where(eq(Member.email, email))
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
