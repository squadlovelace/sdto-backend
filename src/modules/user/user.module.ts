import { Module } from '@nestjs/common';
import { CreateUserReceiverController } from '@modules/user/controller';
import { CreateUserReceiverService } from '@modules/user/services';
import { UserRepository } from '@infra/typeorm/repository/user.repository';

@Module({
  controllers: [CreateUserReceiverController],
  providers: [CreateUserReceiverService, UserRepository],
})
export class UserModule {}
