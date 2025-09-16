import { ApiProperty } from '@nestjs/swagger';

export class GetMemberListResponse {
    @ApiProperty({
        description: '회원 ID',
        type: 'integer',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: '닉네임',
        type: 'string',
        example: '축구왕김철수',
    })
    nickname: string;

    @ApiProperty({
        description: '누적 경고 횟수',
        type: 'integer',
        example: 2,
    })
    warningCount: number;

    @ApiProperty({
        description: '신고한 횟수',
        type: 'integer',
        example: 1,
    })
    reportingCount: number;

    @ApiProperty({
        description: '신고당한 횟수',
        type: 'integer',
        example: 3,
    })
    reportedCount: number;

    @ApiProperty({
        description: '가입일자',
        type: 'string',
        format: 'date-time',
        example: '2024-01-15T09:00:00Z',
    })
    joinedAt: Date;

    @ApiProperty({
        description: '활동상태',
        type: 'string',
        example: 'ACTIVE',
    })
    accountStatus: string;

    constructor(
        id: number,
        nickname: string,
        warningCount: number,
        reportingCount: number,
        reportedCount: number,
        joinedAt: Date,
        accountStatus: string,
    ) {
        this.id = id;
        this.nickname = nickname;
        this.warningCount = warningCount;
        this.reportingCount = reportingCount;
        this.reportedCount = reportedCount;
        this.joinedAt = joinedAt;
        this.accountStatus = accountStatus;
    }
}
