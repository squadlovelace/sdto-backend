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
export class CreateInstitutionService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly connection: DataSource,
  ) {}

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

      const institutionEntity: Institution = queryRunner.manager.create(
        Institution,
        {
          companyName: data.companyName,
          cnpj: data.cnpj,
          collaborator: [savedCollaborator],
          address: savedAddress,
        },
      );

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
}
