import { forwardRef, Module } from '@nestjs/common';
import {
  CreateUserReceiverController,
  CreateUserDonorController,
} from '@modules/user/controller';
import {
  CreateUserReceiverService,
  CreateUserDonorService,
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
  controllers: [CreateUserReceiverController, CreateUserDonorController],
  providers: [
    CreateUserReceiverService,
    UserRepository,
    CreateUserDonorService,
  ],
})
export class UserModule {}
