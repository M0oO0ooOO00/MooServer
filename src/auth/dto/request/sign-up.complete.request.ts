import { Gender, Team } from '../../../common';

export class SignUpCompleteRequest {
    memberId: number;
    nickName: string;
    birthDate: string;
    phoneNumber: string;
    gender: Gender;
    supportTeam: Team;
}
