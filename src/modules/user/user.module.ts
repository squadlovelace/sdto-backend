import { Module } from '@nestjs/common';
import { UserController } from '@modules/user/controller';
import { CreateUserReceiverService } from '@modules/user/services';

@Module({
  controllers: [UserController],
  providers: [CreateUserReceiverService],
})
export class UserModule {}
