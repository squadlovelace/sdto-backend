import { Injectable } from '@nestjs/common';
import { OrganRepository } from '@infra/typeorm/repository';
import { IFindAllOrgan } from './get-all-organ.service';

@Injectable()
export class GetOneOrganService {
  constructor(private readonly organRepository: OrganRepository) {}

  async findById(id: string): Promise<IFindAllOrgan> {
    return await this.organRepository.findOne(id);
  }
}
