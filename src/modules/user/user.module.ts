import { forwardRef, Module } from '@nestjs/common';
import {
  CreateUserReceiverController,
  CreateUserDonorController,
  GetAllUserController,
  GetOneUserController,
} from '@modules/user/controller';
import {
  CreateUserReceiverService,
  CreateUserDonorService,
  GetAllUserService,
  GetOneUserService,
} from '@modules/user/services';
import { UserRepository } from '@infra/typeorm/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor, Profile, Receiver, User } from '@infra/typeorm/entities';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Receiver, Donor]),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    CreateUserReceiverController,
    CreateUserDonorController,
    GetAllUserController,
    GetOneUserController,
  ],
  providers: [
    CreateUserReceiverService,
    UserRepository,
    CreateUserDonorService,
    GetAllUserService,
    GetOneUserService,
  ],
})
export class UserModule {}
