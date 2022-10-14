import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from 'src/infra/typeorm/entities/institution';
import { Repository, QueryRunner, Connection } from 'typeorm';
import { CreateInstitutionalDto } from '../dto/create-institutional.dto';
import { Address } from 'src/infra/typeorm/entities/address';
import { Collaborator } from 'src/infra/typeorm/entities/collaborator';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    private readonly connection: Connection,
  ) {}

  async findAll(): Promise<Institution[]> {
    return await this.institutionRepository.find();
  }

  async findOne(id: string): Promise<Institution> {
    try {
      return await this.institutionRepository.findOneBy({ id: id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateInstitutionalDto): Promise<Institution> {
    const queryRunner = this.connection.createQueryRunner();
    queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const address: Address = queryRunner.manager.create(Address, {
        street: data.address.street,
        complement: data.address.complement,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        state: data.address.state,
        number: data.address.number,
        zipcode: data.address.zipcode,
      });

      const savedAddress = await queryRunner.manager.save(address);

      const collaborator: Collaborator = queryRunner.manager.create(
        Collaborator,
        {
          crm: data.collaborator.crm,
          position: data.collaborator.position,
        },
      );

      const savedCollaborator = await queryRunner.manager.save(collaborator);

      const institutionEntity = new Institution();
      institutionEntity.companyName = data.companyName;
      institutionEntity.cnpj = data.cnpj;
      institutionEntity.collaborator = [savedCollaborator];
      institutionEntity.address = savedAddress;

      const savedInstitutional = await queryRunner.manager.save(
        institutionEntity,
      );
      await queryRunner.commitTransaction();
      return savedInstitutional;
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
    } finally {
      queryRunner.release();
    }

    // return await this.institutionRepository.save(
    //   this.institutionRepository.create(data),
    // );
  }

  async update(id: string, data: any): Promise<Institution> {
    const institution = await this.findOne(id);

    this.institutionRepository.merge(institution, data);
    return await this.institutionRepository.save(institution);
  }

  async DeleteById(id: string): Promise<void> {
    await this.findOne(id);
    await this.institutionRepository.delete(id);
  }
}
