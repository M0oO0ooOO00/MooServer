import { ApiProperty } from '@nestjs/swagger';
import { GetMemberResponse } from './get-member.response';

interface GetMembersResponseInterface {
    members: GetMemberResponse[];
}

export class GetMembersResponse implements GetMembersResponseInterface {
    @ApiProperty({ type: [GetMemberResponse] })
    members: GetMemberResponse[];

    constructor(members: GetMemberResponse[]) {
        this.members = members;
    }

    static from(members: GetMemberResponse[]): GetMembersResponse {
        const memberSummary = members.map((member) =>
            GetMemberResponse.from(member),
        );
        return new GetMembersResponse(memberSummary);
    }
}
