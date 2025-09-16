import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../../member/domain';
import { Profile } from '../../../member/domain';
import { Warn } from '../../domain';
import { Report } from '../../../report/domain';
import { Post } from '../../../post/domain';
import {
    Team,
    TeamDescription,
    Gender,
    GenderDescription,
    PostType,
    PostTypeDescription,
} from '../../../common';

interface MemberDetailInfo {
    id: number;
    name: string;
    nickname: string | null;
    supportTeam: Team | null;
    supportTeamName: string | null;
    gender: string | null;
    age: number | null;
    phoneNumber: string | null;
    joinedAt: Date;
    accountStatus: string;
}

interface WarnRecord {
    reason: string;
    postType: string | null;
    postTitle: string | null;
    postId: number | null;
    warnedAt: Date;
}

interface ReportRecord {
    reportType: string | null;
    postType: string | null;
    postTitle: string | null;
    postId: number | null;
    reportedMemberName: string | null;
    reporterName: string | null;
    reportedAt: Date;
}

interface MemberStatistics {
    totalWarnCount: number;
    totalReportingCount: number;
    totalReportedCount: number;
}

export class WarnRecordResponse implements WarnRecord {
    @ApiProperty({
        description: '경고 사유',
        type: 'string',
        example: '부적절한 게시물 작성',
    })
    reason: string;

    @ApiProperty({
        description: '경고글 유형',
        type: 'string',
        example: '직관메이트 모집',
        nullable: true,
    })
    postType: string | null;

    @ApiProperty({
        description: '경고글 제목',
        type: 'string',
        example: '잠실에서 야구보실 분~',
        nullable: true,
    })
    postTitle: string | null;

    @ApiProperty({
        description: '경고글 ID (링크용)',
        type: 'integer',
        example: 123,
        nullable: true,
    })
    postId: number | null;

    @ApiProperty({
        description: '경고 받은 날짜',
        type: 'string',
        format: 'date-time',
        example: '2024-01-15T14:30:00Z',
    })
    warnedAt: Date;

    constructor(
        reason: string,
        postType: string | null,
        postTitle: string | null,
        postId: number | null,
        warnedAt: Date,
    ) {
        this.reason = reason;
        this.postType = postType;
        this.postTitle = postTitle;
        this.postId = postId;
        this.warnedAt = warnedAt;
    }
}

export class ReportRecordResponse implements ReportRecord {
    @ApiProperty({
        description: '신고 사유',
        type: 'string',
        example: '스팸/도배',
        nullable: true,
    })
    reportType: string | null;

    @ApiProperty({
        description: '신고글 유형',
        type: 'string',
        example: '직관꿀팁',
        nullable: true,
    })
    postType: string | null;

    @ApiProperty({
        description: '신고글 제목',
        type: 'string',
        example: '잠실야구장 맛집 추천',
        nullable: true,
    })
    postTitle: string | null;

    @ApiProperty({
        description: '신고글 ID (링크용)',
        type: 'integer',
        example: 456,
        nullable: true,
    })
    postId: number | null;

    @ApiProperty({
        description: '피신고자 이름 (내가 신고한 경우)',
        type: 'string',
        example: '김철수',
        nullable: true,
    })
    reportedMemberName: string | null;

    @ApiProperty({
        description: '신고자 이름 (내가 신고당한 경우)',
        type: 'string',
        example: '박영희',
        nullable: true,
    })
    reporterName: string | null;

    @ApiProperty({
        description: '신고 날짜',
        type: 'string',
        format: 'date-time',
        example: '2024-01-20T10:15:00Z',
    })
    reportedAt: Date;

    constructor(
        reportType: string | null,
        postType: string | null,
        postTitle: string | null,
        postId: number | null,
        reportedMemberName: string | null,
        reporterName: string | null,
        reportedAt: Date,
    ) {
        this.reportType = reportType;
        this.postType = postType;
        this.postTitle = postTitle;
        this.postId = postId;
        this.reportedMemberName = reportedMemberName;
        this.reporterName = reporterName;
        this.reportedAt = reportedAt;
    }
}

export class MemberDetailResponse
    implements MemberDetailInfo, MemberStatistics
{
    @ApiProperty({
        description: '회원 ID',
        type: 'integer',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: '회원 본명',
        type: 'string',
        example: '홍길동',
    })
    name: string;

    @ApiProperty({
        description: '닉네임',
        type: 'string',
        example: '야구매니아',
        nullable: true,
    })
    nickname: string | null;

    @ApiProperty({
        description: '응원하는 야구팀',
        enum: Team,
        example: Team.LG,
        nullable: true,
    })
    supportTeam: Team | null;

    @ApiProperty({
        description: '응원팀 한글명',
        type: 'string',
        example: 'LG 트윈스',
        nullable: true,
    })
    supportTeamName: string | null;

    @ApiProperty({
        description: '성별',
        type: 'string',
        example: '남성',
        nullable: true,
    })
    gender: string | null;

    @ApiProperty({
        description: '나이',
        type: 'integer',
        example: 28,
        nullable: true,
    })
    age: number | null;

    @ApiProperty({
        description: '전화번호',
        type: 'string',
        example: '010-1234-5678',
        nullable: true,
    })
    phoneNumber: string | null;

    @ApiProperty({
        description: '가입일자',
        type: 'string',
        format: 'date-time',
        example: '2024-01-01T09:00:00Z',
    })
    joinedAt: Date;

    @ApiProperty({
        description: '활동상태',
        type: 'string',
        example: 'ACTIVE',
    })
    accountStatus: string;

    @ApiProperty({
        description: '누적 경고 횟수',
        type: 'integer',
        example: 2,
    })
    totalWarnCount: number;

    @ApiProperty({
        description: '신고한 총 횟수',
        type: 'integer',
        example: 5,
    })
    totalReportingCount: number;

    @ApiProperty({
        description: '신고당한 총 횟수',
        type: 'integer',
        example: 1,
    })
    totalReportedCount: number;

    @ApiProperty({
        description: '상위 3개 경고 기록',
        type: [WarnRecordResponse],
    })
    recentWarns: WarnRecordResponse[];

    @ApiProperty({
        description: '상위 3개 신고한 기록',
        type: [ReportRecordResponse],
    })
    recentReporting: ReportRecordResponse[];

    @ApiProperty({
        description: '상위 3개 신고당한 기록',
        type: [ReportRecordResponse],
    })
    recentReported: ReportRecordResponse[];

    constructor() {
        this.recentWarns = [];
        this.recentReporting = [];
        this.recentReported = [];
    }

    static from(
        member: typeof Member.$inferSelect,
        profile: typeof Profile.$inferSelect | null,
        warnRecords: Array<{
            warn: typeof Warn.$inferSelect;
            post: (typeof Post.$inferSelect & { postType: PostType }) | null;
        }>,
        reportingRecords: Array<{
            report: typeof Report.$inferSelect;
            reportedMember: typeof Member.$inferSelect;
            post: (typeof Post.$inferSelect & { postType: PostType }) | null;
        }>,
        reportedRecords: Array<{
            report: typeof Report.$inferSelect;
            reporterMember: typeof Member.$inferSelect;
            post: (typeof Post.$inferSelect & { postType: PostType }) | null;
        }>,
        statistics: MemberStatistics,
    ): MemberDetailResponse {
        const dto = new MemberDetailResponse();

        // 기본 회원 정보
        dto.id = member.id;
        dto.name = member.name;
        dto.nickname = profile?.nickname || null;
        dto.supportTeam = (profile?.supportTeam as Team) || null;
        dto.supportTeamName = profile?.supportTeam
            ? TeamDescription[profile.supportTeam as Team]
            : null;
        dto.gender = member.gender
            ? GenderDescription[member.gender as Gender]
            : null;
        dto.age = member.birthDate
            ? MemberDetailResponse.calculateAge(member.birthDate)
            : null;
        dto.phoneNumber = member.phoneNumber;
        dto.joinedAt = member.createdAt;
        dto.accountStatus = member.accountStatus;

        // 통계 정보
        dto.totalWarnCount = statistics.totalWarnCount;
        dto.totalReportingCount = statistics.totalReportingCount;
        dto.totalReportedCount = statistics.totalReportedCount;

        // 경고 기록 (상위 3개)
        dto.recentWarns = warnRecords
            .slice(0, 3)
            .map(
                (record) =>
                    new WarnRecordResponse(
                        record.warn.reason,
                        record.post
                            ? PostTypeDescription[record.post.postType]
                            : null,
                        record.post?.title || null,
                        record.post?.id || null,
                        record.warn.createdAt,
                    ),
            );

        // 신고한 기록 (상위 3개)
        dto.recentReporting = reportingRecords.slice(0, 3).map(
            (record) =>
                new ReportRecordResponse(
                    record.report.reportType,
                    record.post
                        ? PostTypeDescription[record.post.postType]
                        : null,
                    record.post?.title || null,
                    record.post?.id || null,
                    record.reportedMember.name,
                    null, // 신고자는 본인이므로 null
                    record.report.createdAt,
                ),
        );

        // 신고당한 기록 (상위 3개)
        dto.recentReported = reportedRecords.slice(0, 3).map(
            (record) =>
                new ReportRecordResponse(
                    record.report.reportType,
                    record.post
                        ? PostTypeDescription[record.post.postType]
                        : null,
                    record.post?.title || null,
                    record.post?.id || null,
                    null, // 피신고자는 본인이므로 null
                    record.reporterMember.name,
                    record.report.createdAt,
                ),
        );

        return dto;
    }

    private static calculateAge(birthDate: string): number {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }

        return age;
    }
}
