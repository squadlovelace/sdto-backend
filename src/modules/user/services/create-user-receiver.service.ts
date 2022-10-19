import { Injectable } from '@nestjs/common';
import { CreateUserReceiverDto } from '../dto';
import { UserRepository } from '@infra/typeorm/repository';
import { ProfileTypes } from '@shared/profile-types.enum';
@Injectable()
export class CreateUserReceiverService {
  constructor(private readonly userRepository: UserRepository) {}

  async add(input: CreateUserReceiverDto): Promise<void> {
    await this.userRepository.addUserReceiver(input, ProfileTypes.RECEIVER);
  }
}
