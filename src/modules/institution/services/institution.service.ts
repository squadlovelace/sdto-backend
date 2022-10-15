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

  async create(data: CreateInstitutionDto): Promise<Institution> {
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

      const profileType = await this.profileRepository.findOneBy({
        type: ProfileTypes.ADMIN,
      });

      const user: User = queryRunner.manager.create(User, {
        ...data.collaborator,
        profile: profileType,
      });

      const savedUser = await queryRunner.manager.save(user);

      const collaborator: Collaborator = queryRunner.manager.create(
        Collaborator,
        {
          crm: data.collaborator.crm,
          position: data.collaborator.position,
          user: savedUser,
        },
      );

      const savedCollaborator = await queryRunner.manager.save(collaborator);

      const institutionEntity = new Institution();
      institutionEntity.companyName = data.companyName;
      institutionEntity.cnpj = data.cnpj;
      institutionEntity.collaborator = [savedCollaborator];
      institutionEntity.address = savedAddress;

      const savedInstitution = await queryRunner.manager.save(
        institutionEntity,
      );
      await queryRunner.commitTransaction();
      return savedInstitution;
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
