import {
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOrganDto } from '@modules/organ/dto';
import { Organ } from '../entities';
import { IFindAllOrgan } from '@modules/organ/services';
import { GetOrganDto } from '@modules/organ/dto/get-all-organ.dto';

@Injectable()
export class OrganRepository {
  constructor(private readonly datasource: DataSource) {}
  private organDatasource = this.datasource.getRepository(Organ);

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

  async findAll(
    options: Omit<GetOrganDto, 'id'>,
  ): Promise<{ total: number; organs: IFindAllOrgan[] }> {
    const page = options.page || 1;
    const limit = options.limit || 50;

    const { name, organType } = options;
    const query = this.organDatasource.createQueryBuilder('organ');

    if (name) {
      query.where('organ.name LIKE :name', { name: `%${name}%` });
    }

    if (organType) {
      query.andWhere('organ.organType = :organType', { organType });
    }
    query.skip((page - 1) * limit);
    query.take(+limit);
    query.orderBy(options.sort ? JSON.stringify(options.sort) : undefined);
    query.select([
      'organ.id',
      'organ.name',
      'organ.ischemiaTime',
      'organ.organType',
    ]);

    const [organs, total] = await query.getManyAndCount();

    return { total, organs };
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
