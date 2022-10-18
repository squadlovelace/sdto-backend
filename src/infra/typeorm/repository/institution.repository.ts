import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Institution, User, Profile } from '@infra/typeorm/entities';
import { Address } from '@infra/typeorm/entities';
import { Collaborator } from '@infra/typeorm/entities';
import { CreateInstitutionDto } from '@modules/institution/dto/create-institution.dto';
import { ProfileTypes } from '@shared/profile-types.enum';
import {
  CpfInUseError,
  EmailInUseError,
  RgInUseError,
} from '@modules/institution/exception';
import { IFindAllInstitution } from '@modules/institution/services';

@Injectable()
export class InstitutionRepository {
  constructor(private readonly datasource: DataSource) {}
  private institutionRepository = this.datasource.getRepository(Institution);

  async add(data: CreateInstitutionDto): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const email = await queryRunner.manager.findOneBy(User, {
        email: data.collaborator.email,
      });

      if (email) {
        throw new EmailInUseError();
      }

      const rg = await queryRunner.manager.findOneBy(User, {
        rg: data.collaborator.rg,
      });

      if (rg) {
        throw new RgInUseError();
      }

      const cpf = await queryRunner.manager.findOneBy(User, {
        cpf: data.collaborator.cpf,
      });

      if (cpf) {
        throw new CpfInUseError();
      }

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

      const profileType = await queryRunner.manager.findOneBy(Profile, {
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

      await queryRunner.manager.save(institutionEntity);

      await queryRunner.commitTransaction();
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

  async findAll(): Promise<IFindAllInstitution[]> {
    const query = this.institutionRepository.createQueryBuilder();
    query.select([
      'institution.id',
      'institution.companyName',
      'institution.cnpj',
    ]);
    query.from(Institution, 'institution');
    query
      .leftJoin('institution.collaborator', 'collaborator')
      .addSelect([
        'collaborator.id',
        'collaborator.crm',
        'collaborator.position',
      ])
      .leftJoin('collaborator.user', 'user')
      .addSelect(['user.id', 'user.name']);
    const institutions = await query.getMany();
    const responseData: IFindAllInstitution[] = [];

    for (const institution of institutions) {
      responseData.push({
        id: institution.id,
        companyName: institution.companyName,
        cnpj: institution.cnpj,
        address: institution.address,
        collaborators: institution.collaborator,
      });
    }
    return responseData;
  }
}
