import { ApiProperty } from '@nestjs/swagger';

export class GetMemberResponse {
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

    static from(member: any): GetMemberResponse {
        const dto = new GetMemberResponse();
        dto.id = member.id;
        dto.name = member.name;
        dto.createdAt = member.createdAt;
        return dto;
    }
}
