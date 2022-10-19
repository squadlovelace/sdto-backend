import { Injectable } from '@nestjs/common';
import { OrganTypes } from '@shared/organ-types.enum';
import { OrganRepository } from '@infra/typeorm/repository';

export interface IFindAllOrgan {
  name?: string;
  ischemiaTime?: string;
  organType?: OrganTypes;
}

@Injectable()
export class GetAllOrganService {
  constructor(private readonly organRepository: OrganRepository) {}

  async findAll(): Promise<IFindAllOrgan[]> {
    return await this.organRepository.findAll();
  }
}
