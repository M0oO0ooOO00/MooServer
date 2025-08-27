import { ApiProperty } from '@nestjs/swagger';

export class MemberSummaryDto {
    @ApiProperty({
        description: '사용자 ID',
        type: 'integer',
    })
    id: number;

    @ApiProperty({
        description: '사용자 이름',
        type: 'string',
    })
    name: string;

    @ApiProperty({
        description: '생성일',
        type: 'string',
        format: 'date-time',
    })
    createdAt: Date;

    static from(member: any): MemberSummaryDto {
        const dto = new MemberSummaryDto();
        dto.id = member.id;
        dto.name = member.name;
        dto.createdAt = member.createdAt;
        return dto;
    }
}

export class GetMembersResponseDto {
    @ApiProperty({ type: [MemberSummaryDto] })
    members: MemberSummaryDto[];

    constructor(members: MemberSummaryDto[]) {
        this.members = members;
    }

    static from(members: any[]): GetMembersResponseDto {
        const memberSummaries = members.map((member) =>
            MemberSummaryDto.from(member),
        );
        return new GetMembersResponseDto(memberSummaries);
    }
}
