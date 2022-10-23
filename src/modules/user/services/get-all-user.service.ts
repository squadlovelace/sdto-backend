import { Injectable } from '@nestjs/common';
import {
  Address,
  Responsible,
  Profile,
  Receiver,
  Donor,
} from '@infra/typeorm/entities';
import { UserRepository } from '@infra/typeorm/repository';
import { BloodTypes } from '@shared/blood-types.enum';

export interface IFindAllUser {
  id?: string;
  email?: string;
  name?: string;
  rg?: string;
  cpf?: string;
  phone?: string;
  birthDate?: Date;
  gender?: string;
  bloodType?: BloodTypes;
  responsible?: Responsible;
  receiver?: Receiver;
  donor?: Donor;
  address?: Address;
  profile?: Profile;
}

@Injectable()
export class GetAllUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async find(): Promise<IFindAllUser[]> {
    return await this.userRepository.findAll();
  }
}
