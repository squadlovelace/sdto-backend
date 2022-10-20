import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '@infra/typeorm/repository';
import { User } from '@infra/typeorm/entities';
import { jwtConfig } from '../../constants/jwt-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    if (!payload) {
      throw new UnauthorizedException({ message: 'Payload não informadp' });
    }

    const { id } = payload;
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
