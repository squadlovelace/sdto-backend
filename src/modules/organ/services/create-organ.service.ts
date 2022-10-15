import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organ } from 'src/infra/typeorm/entities/organ';
import { CreateOrganDto } from '../dto/create-organ.dto';

@Injectable()
export class CreateOrganService {
  constructor(
    @InjectRepository(Organ)
    private readonly organRepository: Repository<Organ>,
  ) {}

  async add(data: CreateOrganDto): Promise<void> {
    const organ = new Organ();
    organ.name = data.name;
    organ.ischemiaTime = data.ischemiaTime;
    organ.organType = data.organType;

    await this.organRepository.save(organ);
  }
}
