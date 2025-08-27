import { ApiProperty } from '@nestjs/swagger';

interface GetMemberResponseInterface {
    id: number;
    name: string;
    createdAt: Date;
}

export class GetMemberResponse implements GetMemberResponseInterface {
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

    static from(member: GetMemberResponseInterface): GetMemberResponse {
        const dto = new GetMemberResponse();
        dto.id = member.id;
        dto.name = member.name;
        dto.createdAt = member.createdAt;
        return dto;
    }
}
