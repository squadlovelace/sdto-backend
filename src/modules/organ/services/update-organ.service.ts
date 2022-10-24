import { OrganRepository } from '@infra/typeorm/repository/organ.repository';
import { Injectable } from '@nestjs/common';
import { CreateOrganDto } from '../dto/create-organ.dto';

@Injectable()
export class UpdateOrganService {
  constructor(private readonly organRepository: OrganRepository) {}

  async update(id: string, input: CreateOrganDto): Promise<void> {
    await this.organRepository.update(id, input);
  }
}
