import { ApiProperty } from '@nestjs/swagger';

export class RecruitmentSummaryResponse {
    @ApiProperty({
        description: '페이지 내 순서 번호',
        example: 1,
    })
    number: number;

    @ApiProperty({
        description: '게시글 제목',
        example: '잠실에서 야구 보실 분 구해요!',
    })
    title: string;

    @ApiProperty({
        description: '경기 일자',
        example: '2024-03-15',
        format: 'date',
    })
    gameDate: string;

    @ApiProperty({
        description: '경기 팀',
        example: 'LG 트윈스 vs KIA 타이거즈',
    })
    gameTeams: string;

    @ApiProperty({
        description: '작성자 닉네임',
        example: '야구매니아',
    })
    author: string;

    @ApiProperty({
        description: '모집 상태',
        enum: ['RECRUITING', 'COMPLETED'],
        example: 'RECRUITING',
    })
    recruitmentStatus: 'RECRUITING' | 'COMPLETED';

    @ApiProperty({
        description: '게시일자',
        example: '2024-03-10T10:30:00.000Z',
    })
    createdAt: Date;

    constructor(
        number: number,
        title: string,
        gameDate: string,
        gameTeams: string,
        author: string,
        recruitmentStatus: 'RECRUITING' | 'COMPLETED',
        createdAt: Date,
    ) {
        this.number = number;
        this.title = title;
        this.gameDate = gameDate;
        this.gameTeams = gameTeams;
        this.author = author;
        this.recruitmentStatus = recruitmentStatus;
        this.createdAt = createdAt;
    }

    static create(
        index: number,
        page: number,
        pageSize: number,
        data: {
            title: string;
            gameDate: string;
            teamHome: string;
            teamAway: string;
            authorNickname: string;
            postStatus: string;
            gameDateTime: string;
            createdAt: Date;
        },
    ): RecruitmentSummaryResponse {
        const number = (page - 1) * pageSize + index + 1;
        const gameTeams = `${data.teamHome} vs ${data.teamAway}`;
        const recruitmentStatus = RecruitmentSummaryResponse.determineStatus(
            data.postStatus,
            data.gameDateTime,
        );

        return new RecruitmentSummaryResponse(
            number,
            data.title,
            data.gameDate,
            gameTeams,
            data.authorNickname,
            recruitmentStatus,
            data.createdAt,
        );
    }

    private static determineStatus(
        postStatus: string,
        gameDateTime: string,
    ): 'RECRUITING' | 'COMPLETED' {
        if (postStatus === 'CLOSE') {
            return 'COMPLETED';
        }

        // 경기일이 지난 경우
        const gameDate = new Date(gameDateTime);
        const now = new Date();
        if (gameDate < now) {
            return 'COMPLETED';
        }

        return 'RECRUITING';
    }
}