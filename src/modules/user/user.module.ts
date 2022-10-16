import { Module } from '@nestjs/common';
import { UserController } from '@modules/user/controller';
import { UserService } from '@modules/user/services';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
