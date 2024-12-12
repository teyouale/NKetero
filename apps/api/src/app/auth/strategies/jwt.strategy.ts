import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { Payload } from '../utils/payload';
import { Config } from '../../config/schema';
import { UserService } from '../../user/user.service';
import { request } from 'http';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userService: UserService
  ) {
    const extractors = [
      (request: Request) => {
        return request.cookies.Authentication;
      },
    ];

    super({
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(payload: Payload) {
    // return this.userService.findOneById(payload.id);
    return {
      userId: payload.id,
      role: payload.role,
    };
  }
}
