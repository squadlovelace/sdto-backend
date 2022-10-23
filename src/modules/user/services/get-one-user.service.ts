import { Injectable } from '@nestjs/common';
import { UserRepository } from '@infra/typeorm/repository';
import { IFindAllUser } from './get-all-user.service';

@Injectable()
export class GetOneUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: string): Promise<IFindAllUser> {
    return await this.userRepository.findOne(id);
  }
}
