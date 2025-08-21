import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseColumns } from '../../common/db/base.entity';
import { Role } from '../../common/enums/role.enum';
import { Profile } from './profile.entity';
import { ReportCount } from '../../report/domain/report-count.entity';
import { Report } from '../../report/domain/report.entity';

export const roleEnum = pgEnum(
    'role',
    Object.values(Role) as [string, ...string[]],
);

export const Member = pgTable('member', {
    ...baseColumns,
    name: text('name').notNull(),
    email: text('email').notNull(),
    birthDate: text('birth_date').notNull(),
    phoneNumber: text('phone_number'),
    role: roleEnum('role').notNull(),
});

export const memberRelations = relations(Member, ({ one }) => ({
    Profile: one(Profile),
    ReportCount: one(ReportCount),
    Report: one(Report),
}));
