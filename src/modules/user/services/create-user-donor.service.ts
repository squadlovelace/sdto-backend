import { Injectable } from '@nestjs/common';
import { CreateUserDonorDto } from '../dto';
import { UserRepository } from '@infra/typeorm/repository';
import { ProfileTypes } from '@shared/profile-types.enum';
@Injectable()
export class CreateUserDonorService {
  constructor(private readonly userRepository: UserRepository) {}

  async add(input: CreateUserDonorDto): Promise<void> {
    await this.userRepository.addUserDonor(input, ProfileTypes.DONOR);
  }
}
