import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  Institution,
  User,
  Profile,
  Address,
  Collaborator,
} from '@infra/typeorm/entities';
import { CreateInstitutionDto } from '@modules/institution/dto/create-institution.dto';
import { ProfileTypes } from '@shared/profile-types.enum';
import {
  CpfInUseError,
  EmailInUseError,
  RgInUseError,
  CnpjInUseError,
  CrmInUseError,
} from '@modules/exception';
import { IFindAllInstitution } from '@modules/institution/services';
import { GetAllInstitutionDto } from '@modules/institution/dto';
import { CreateCollaboratorDto } from '@modules/institution/dto/create-collaborator.dto';

@Injectable()
export class InstitutionRepository {
  constructor(private readonly datasource: DataSource) {}
  private institutionRepository = this.datasource.getRepository(Institution);

  async add(data: CreateInstitutionDto): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const validateInstitution = await queryRunner.manager.findOne(
        Institution,
        { where: { cnpj: data.cnpj } },
      );
      if (validateInstitution) {
        throw new CnpjInUseError();
      }

      const userCpf = await queryRunner.manager.findOne(User, {
        where: { cpf: data.collaborator.cpf },
      });
      if (userCpf) {
        throw new CpfInUseError();
      }

      const userRg = await queryRunner.manager.findOne(User, {
        where: { rg: data.collaborator.rg },
      });
      if (userRg) {
        throw new RgInUseError();
      }

      const userEmail = await queryRunner.manager.findOne(User, {
        where: { email: data.collaborator.email },
      });
      if (userEmail) {
        throw new EmailInUseError();
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

  async findAll(
    options: Omit<GetAllInstitutionDto, 'id'>,
  ): Promise<{ total: number; institutions: IFindAllInstitution[] }> {
    const page = options.page || 1;
    const limit = options.limit || 50;

    const companyName = options.companyName;

    const query = this.institutionRepository.createQueryBuilder('institution');
    query.select([
      'institution.id',
      'institution.companyName',
      'institution.cnpj',
    ]);
    query.leftJoinAndSelect('institution.address', 'address');

    if (companyName) {
      query.where('institution.companyName LIKE :companyName', {
        companyName: `%${companyName}%`,
      });
    }

    query
      .leftJoin('institution.collaborator', 'collaborator')
      .addSelect([
        'collaborator.id',
        'collaborator.crm',
        'collaborator.position',
      ])
      .leftJoin('collaborator.user', 'user')
      .addSelect(['user.id', 'user.name'])
      .leftJoin('user.profile', 'profile')
      .addSelect(['profile.type']);

    query.skip((page - 1) * limit);
    query.take(+limit);
    const [institutions, total] = await query.getManyAndCount();

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
    return {
      total,
      institutions: responseData,
    };
  }

  async findOne(id: string): Promise<IFindAllInstitution> {
    const query = this.institutionRepository.createQueryBuilder();
    query.select([
      'institution.id',
      'institution.companyName',
      'institution.cnpj',
    ]);
    query.from(Institution, 'institution');
    query.where('institution.id = :id', { id });
    query.leftJoinAndSelect('institution.address', 'address');
    query
      .leftJoin('institution.collaborator', 'collaborator')
      .addSelect([
        'collaborator.id',
        'collaborator.crm',
        'collaborator.position',
      ])
      .leftJoin('collaborator.user', 'user')
      .addSelect(['user.id', 'user.name']);
    const institutions = await query.getOne();

    const responseData: IFindAllInstitution = {
      id: institutions.id,
      companyName: institutions.companyName,
      cnpj: institutions.cnpj,
      address: institutions.address,
      collaborators: institutions.collaborator,
    };

    return responseData;
  }

  async addCollaborator(
    data: CreateCollaboratorDto,
    idInstitution: string,
  ): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.connect();

    try {
      queryRunner.startTransaction();

      const institution = await queryRunner.manager.findOne(Institution, {
        where: { id: idInstitution },
      });

      const profileType = await queryRunner.manager.findOneBy(Profile, {
        type: ProfileTypes.PROFISSIONAL,
      });

      const user = queryRunner.manager.create(User, {
        email: data.email,
        name: data.name,
        rg: data.rg,
        cpf: data.cpf,
        password: data.password,
        phone: data.phone,
        birthDate: data.birthDate,
        gender: data.gender,
        bloodType: data.bloodType,
        profile: profileType,
      });
      const savedDataUser = await queryRunner.manager.save(user);

      const collaborator = queryRunner.manager.create(Collaborator, {
        crm: data.crm,
        position: data.position,
        user: savedDataUser,
        institution: institution,
      });
      await queryRunner.manager.save(collaborator);
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
}
