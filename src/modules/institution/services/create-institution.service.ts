import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from '../dto/create-institution.dto';
import { InstitutionRepository } from '@infra/typeorm/repository';

@Injectable()
export class CreateInstitutionService {
  constructor(private readonly institutionRepository: InstitutionRepository) {}

  async add(data: CreateInstitutionDto): Promise<void> {
    await this.institutionRepository.add(data);
  }
}
