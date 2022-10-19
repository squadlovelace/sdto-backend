import { Module } from '@nestjs/common';
import {
  CreateUserReceiverController,
  CreateUserDonorController,
} from '@modules/user/controller';
import {
  CreateUserReceiverService,
  CreateUserDonorService,
} from '@modules/user/services';
import { UserRepository } from '@infra/typeorm/repository/user.repository';

@Module({
  controllers: [CreateUserReceiverController, CreateUserDonorController],
  providers: [
    CreateUserReceiverService,
    UserRepository,
    CreateUserDonorService,
  ],
})
export class UserModule {}
