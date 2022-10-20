import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Collaborator, Address } from '@infra/typeorm/entities';
import { InstitutionRepository } from '@infra/typeorm/repository';
import { IFindAllInstitution } from './get-all-institution.service';

@Injectable()
export class GetOneInstitutionService {
  constructor(private readonly institutionRepository: InstitutionRepository) {}

  async findById(id: string): Promise<IFindAllInstitution> {
    return await this.institutionRepository.findOne(id);
  }
}
