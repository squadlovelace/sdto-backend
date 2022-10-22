import { Injectable } from '@nestjs/common';
import { OrganTypes } from '@shared/organ-types.enum';
import { OrganRepository } from '@infra/typeorm/repository';
import { IFindAllOrgan } from './get-all-organ.service';

@Injectable()
export class DeleteOrganService {
  constructor(private readonly organRepository: OrganRepository) {}

  async delete(id: string): Promise<void> {
    await this.organRepository.delete(id);
  }
}
