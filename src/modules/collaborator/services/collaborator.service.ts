import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from 'src/infra/typeorm/entities/collaborator';
import { Repository, QueryRunner, Connection } from 'typeorm';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';
import { Institution } from 'src/infra/typeorm/entities/institution';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
    private readonly connection: Connection,
  ) {}

  async findAll(): Promise<Collaborator[]> {
    return await this.collaboratorRepository.find();
  }

  async findOne(id: string): Promise<Collaborator> {
    try {
      return await this.collaboratorRepository.findOneBy({ id: id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateCollaboratorDto): Promise<Collaborator> {
    const queryRunner = this.connection.createQueryRunner();
    queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const institution: Institution = queryRunner.manager.create(Institution, {
        companyName: data.institution.companyName,
        cnpj: data.institution.cnpj,
      });

      const savedInstitution = await queryRunner.manager.save(institution);

      const collaboratorEntity = new Collaborator();
      collaboratorEntity.crm = data.crm;
      collaboratorEntity.position = data.position;
      collaboratorEntity.institution = savedInstitution;

      const savedCollaborator = await queryRunner.manager.save(
        collaboratorEntity,
      );
      await queryRunner.commitTransaction();
      return savedCollaborator;
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
    } finally {
      queryRunner.release();
    }
  }

  async update(id: string, data: any): Promise<Collaborator> {
    const collaborator = await this.findOne(id);

    this.collaboratorRepository.merge(collaborator, data);
    return await this.collaboratorRepository.save(collaborator);
  }

  async DeleteById(id: string): Promise<void> {
    await this.findOne(id);
    await this.collaboratorRepository.delete(id);
  }
}
