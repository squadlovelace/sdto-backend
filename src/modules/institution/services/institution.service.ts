import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from 'src/infra/typeorm/entities/institution';
import { Repository, DataSource } from 'typeorm';
import { CreateInstitutionDto } from '../dto/create-institution.dto';
import { Address } from 'src/infra/typeorm/entities/address';
import { Collaborator } from 'src/infra/typeorm/entities/collaborator';
import { User } from 'src/infra/typeorm/entities/user';
import { Profile } from 'src/infra/typeorm/entities/profile';
import { ProfileTypes } from 'src/shared/profile-types.enum';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    @InjectRepository(User)
    private readonly userRepositorry: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly connection: DataSource,
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

  async update(id: string, data: CreateInstitutionDto): Promise<Institution> {
    const institution = await this.findOne(id);
    institution.companyName = data.companyName;
    institution.cnpj = data.cnpj;

    return this.institutionRepository.save(institution);
  }

  async DeleteById(id: string): Promise<void> {
    await this.findOne(id);
    await this.institutionRepository.delete(id);
  }
}
