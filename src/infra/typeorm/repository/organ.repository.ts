import {
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOrganDto } from '@modules/organ/dto';
import { Organ } from '../entities';
import { IFindAllOrgan } from '@modules/organ/services';

@Injectable()
export class OrganRepository {
  constructor(private readonly datasource: DataSource) {}
  private organRepository = this.datasource.getRepository(Organ);

  async add(input: CreateOrganDto): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const organ = queryRunner.manager.create(Organ, {
        name: input.name,
        ischemiaTime: input.ischemiaTime,
        organType: input.organType,
      });
      await queryRunner.manager.save(organ);
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus());
      } else {
        throw new InternalServerErrorException({ response: error.message });
      }
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<IFindAllOrgan[]> {
    const organs = await this.organRepository.find();
    return organs;
  }

  async findOne(id: string): Promise<IFindAllOrgan> {
    const organ = await this.organRepository.findOne({ where: { id } });
    return organ;
  }

  async update(id: string, data: CreateOrganDto): Promise<IFindAllOrgan> {
    const organ = await this.findOne(id);
    organ.name = data.name;
    organ.ischemiaTime = data.ischemiaTime;
    organ.organType = data.organType;

    return this.organRepository.save(organ);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.organRepository.delete(id);
  }
}
