import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@infra/typeorm/repository';
import { CredentialsDto } from '../dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SigninService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(credentialsDto: CredentialsDto): Promise<{ token: string }> {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais Inválidas');
    }

    const jwtPayload = { id: user.id };
    const token = this.jwtService.sign(jwtPayload);

    return { token };
  }
}
