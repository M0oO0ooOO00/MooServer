import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MemberService } from "src/member/member.service";
import { JwtPayload } from "../types";
import { MemberRepository } from "src/member/member.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private memberService: MemberService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET') ?? 'SECRET',
        })
    }

    async validate(jwtPayload: JwtPayload) {
        const member = await this.memberService.findOneById(jwtPayload.id);

        if (member === null) {
            throw new UnauthorizedException();
        }

        return member;
    }
}