import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from 'src/infra/typeorm/entities/collaborator';
import { Repository } from 'typeorm';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
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

  async create(data: any): Promise<Collaborator[]> {
    return await this.collaboratorRepository.save(
      this.collaboratorRepository.create(data),
    );
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
