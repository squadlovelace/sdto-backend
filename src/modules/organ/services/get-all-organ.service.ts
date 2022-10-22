import { Injectable } from '@nestjs/common';
import { OrganTypes } from '@shared/organ-types.enum';
import { OrganRepository } from '@infra/typeorm/repository';
import { GetOrganDto } from '../dto/get-all-organ.dto';

export interface IFindAllOrgan {
  name?: string;
  ischemiaTime?: string;
  organType?: OrganTypes;
}

@Injectable()
export class GetAllOrganService {
  constructor(private readonly organRepository: OrganRepository) {}

  async findAll(
    options: Omit<GetOrganDto, 'id'>,
  ): Promise<{ organs: IFindAllOrgan[]; total: number }> {
    return await this.organRepository.findAll(options);
  }
}
