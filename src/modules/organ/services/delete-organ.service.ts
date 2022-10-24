import { Injectable } from '@nestjs/common';
import { OrganRepository } from '@infra/typeorm/repository';

@Injectable()
export class DeleteOrganService {
  constructor(private readonly organRepository: OrganRepository) {}

  async delete(id: string): Promise<void> {
    await this.organRepository.delete(id);
  }
}
