import { pgEnum } from 'drizzle-orm/pg-core';
import { ReportType } from '../../enums';

export const reportTypePgEnum = pgEnum(
    'report_type',
    Object.values(ReportType) as [string, ...string[]],
);
