import { Injectable } from '@nestjs/common';
import { Collaborator, Address } from '@infra/typeorm/entities';
import { InstitutionRepository } from '@infra/typeorm/repository';
import { GetAllInstitutionDto } from '../dto';

export interface IFindAllInstitution {
  id?: string;
  companyName?: string;
  cnpj?: string;
  address?: Address;
  collaborators?: Collaborator[];
}

@Injectable()
export class GetAllInstitutionService {
  constructor(private readonly institutionRepository: InstitutionRepository) {}

  async find(
    options: Omit<GetAllInstitutionDto, 'id'>,
  ): Promise<{ total: number; institutions: IFindAllInstitution[] }> {
    return await this.institutionRepository.findAll(options);
  }
}
