import { ApiProperty } from '@nestjs/swagger';

interface CreateMemberResponseInterface {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

export class CreateMemberResponse implements CreateMemberResponseInterface {
    @ApiProperty({ description: '생성된 사용자 ID', type: 'integer' })
    id: number;

    @ApiProperty({ description: '사용자 이름', type: 'string' })
    name: string;

    @ApiProperty({ description: '이메일', type: 'string' })
    email: string;

    @ApiProperty({ description: '생성일', type: 'string', format: 'date-time' })
    createdAt: Date;

    static from(member: CreateMemberResponseInterface): CreateMemberResponse {
        const response = new CreateMemberResponse();
        response.id = member.id;
        response.name = member.name;
        response.email = member.email;
        response.createdAt = member.createdAt;
        return response;
    }
}
