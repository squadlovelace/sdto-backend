import { User } from '@infra/typeorm/entities';
import { UserRepository } from '@infra/typeorm/repository';
import { UserModule } from '@modules/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt-strategy';
import { jwtConfig } from '../../constants/jwt-config';
import { SigninController } from './controller/signin.controller';
import { SigninService } from './services/signin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [JwtAuthGuard, JwtStrategy, UserRepository, SigninService],
  controllers: [SigninController],
})
export class AuthModule {}
