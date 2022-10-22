import { Injectable } from '@nestjs/common';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';
import { InstitutionRepository } from '@infra/typeorm/repository';

@Injectable()
export class CreateCollaboratorService {
  constructor(private readonly institutionRepository: InstitutionRepository) {}

  async add(data: CreateCollaboratorDto, idInstitution: string): Promise<void> {
    await this.institutionRepository.addCollaborator(data, idInstitution);
  }
}
