import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
interface JwtPayload {
  email: string;
  id: number;
  iat?: number;
  exp?: number;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as unknown as string,
    });
  }

  validate(payload: JwtPayload) {
    return { userId: payload.id, email: payload.email };
  }
}
