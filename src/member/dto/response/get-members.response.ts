import { ApiProperty } from '@nestjs/swagger';
import { GetMemberResponse } from './get-member.response';

export class GetMembersResponse {
    @ApiProperty({ type: [GetMemberResponse] })
    members: GetMemberResponse[];

    constructor(members: GetMemberResponse[]) {
        this.members = members;
    }

    static from(members: any[]): GetMembersResponse {
        const memberSummary = members.map((member) =>
            GetMemberResponse.from(member),
        );
        return new GetMembersResponse(memberSummary);
    }
}
