import { OrganRepository } from '@infra/typeorm/repository/organ.repository';
import { Injectable } from '@nestjs/common';
import { CreateOrganDto } from '../dto/create-organ.dto';

@Injectable()
export class CreateOrganService {
  constructor(private readonly organRepository: OrganRepository) {}

  async add(input: CreateOrganDto): Promise<void> {
    await this.organRepository.add(input);
  }
}
