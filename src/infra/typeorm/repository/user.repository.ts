import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  User,
  Profile,
  Receiver,
  Address,
  Organ,
  Responsible,
  Donor,
} from '@infra/typeorm/entities';
import {
  CpfInUseError,
  EmailInUseError,
  RgInUseError,
} from '@modules/exception';
import { CreateUserReceiverDto, CreateUserDonorDto } from '@modules/user/dto';
import { ProfileTypes } from '@shared/profile-types.enum';
import { CredentialsDto } from '@modules/auth/dto';
import { IFindAllUser } from '@modules/user/services/get-all-user.service';

@Injectable()
export class UserRepository {
  constructor(private readonly datasource: DataSource) {}
  private userDatasource = this.datasource.getRepository(User);

  async addUserReceiver(
    input: CreateUserReceiverDto,
    profile: ProfileTypes,
  ): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const userCpf = await queryRunner.manager.findOne(User, {
        where: { cpf: input.cpf },
      });
      if (userCpf) {
        throw new CpfInUseError();
      }

      const userRg = await queryRunner.manager.findOne(User, {
        where: { rg: input.rg },
      });
      if (userRg) {
        throw new RgInUseError();
      }

      const userEmail = await queryRunner.manager.findOne(User, {
        where: { email: input.email },
      });
      if (userEmail) {
        throw new EmailInUseError();
      }

      const address: Address = queryRunner.manager.create(Address, {
        street: input.address.street,
        complement: input.address.complement,
        neighborhood: input.address.neighborhood,
        city: input.address.city,
        state: input.address.state,
        number: input.address.number,
        zipcode: input.address.zipcode,
      });
      const savedAddress = await queryRunner.manager.save(address);

      const profileType = await queryRunner.manager.findOneBy(Profile, {
        type: profile,
      });

      const reponsible: Responsible = queryRunner.manager.create(Responsible, {
        name: input.responsible.name,
        relationship: input.responsible.relationship,
      });
      const savedResponsible = await queryRunner.manager.save(reponsible);

      const userReceiver: User = queryRunner.manager.create(User, {
        ...input,
        profile: profileType,
        responsible: savedResponsible,
        address: savedAddress,
      });
      const saveUserReceiver = await queryRunner.manager.save(userReceiver);

      const organsToAdd = [];
      for (const data of input.organ) {
        const organ = await queryRunner.manager.findOne(Organ, {
          where: { id: data },
        });
        organsToAdd.push(organ);
      }

      const receiver = queryRunner.manager.create(Receiver, {
        comorbidity: input.comorbidity,
        rgct: input.rgct,
        organ: organsToAdd,
        user: saveUserReceiver,
      });

      await queryRunner.manager.save(receiver);
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

  async addUserDonor(
    input: CreateUserDonorDto,
    profile: ProfileTypes,
  ): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const userCpf = await queryRunner.manager.findOne(User, {
        where: { cpf: input.cpf },
      });
      if (userCpf) {
        throw new CpfInUseError();
      }

      const userRg = await queryRunner.manager.findOne(User, {
        where: { rg: input.rg },
      });
      if (userRg) {
        throw new RgInUseError();
      }

      const userEmail = await queryRunner.manager.findOne(User, {
        where: { email: input.email },
      });
      if (userEmail) {
        throw new EmailInUseError();
      }

      const address: Address = queryRunner.manager.create(Address, {
        street: input.address.street,
        complement: input.address.complement,
        neighborhood: input.address.neighborhood,
        city: input.address.city,
        state: input.address.state,
        number: input.address.number,
        zipcode: input.address.zipcode,
      });
      const savedAddress = await queryRunner.manager.save(address);

      const profileType = await queryRunner.manager.findOneBy(Profile, {
        type: profile,
      });

      const reponsible: Responsible = queryRunner.manager.create(Responsible, {
        name: input.responsible.name,
        relationship: input.responsible.relationship,
      });
      const savedResponsible = await queryRunner.manager.save(reponsible);

      const userDonor: User = queryRunner.manager.create(User, {
        ...input,
        profile: profileType,
        responsible: savedResponsible,
        address: savedAddress,
      });
      const saveUserDonor = await queryRunner.manager.save(userDonor);

      const organsToAdd = [];
      for (const data of input.organ) {
        const organ = await queryRunner.manager.findOne(Organ, {
          where: { id: data },
        });
        organsToAdd.push(organ);
      }

      const donor = queryRunner.manager.create(Donor, {
        type: input.type,
        organ: organsToAdd,
        user: saveUserDonor,
      });

      await queryRunner.manager.save(donor);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
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

  async checkCredentials(credentials: CredentialsDto): Promise<User> {
    const { cpf, password } = credentials;
    const user = await this.userDatasource.findOne({
      where: { cpf },
      relations: { profile: true },
    });

    if (user && User.checkPassword(password, user.password)) {
      return user;
    } else {
      return null;
    }
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userDatasource.findOne({ where: { id } });
    return user;
  }

  async findAll(): Promise<IFindAllUser[]> {
    const query = this.userDatasource.createQueryBuilder('user');
    query.select([
      'user.id',
      'user.email',
      'user.name',
      'user.rg',
      'user.cpf',
      'user.phone',
      'user.birthDate',
      'user.gender',
      'user.bloodType',
    ]);
    query.leftJoinAndSelect('user.address', 'address');
    query.leftJoinAndSelect('user.profile', 'profile');
    query.leftJoinAndSelect('user.responsible', 'responsible');
    query
      .leftJoinAndSelect('user.receiver', 'receiver')
      .leftJoinAndSelect('receiver.organ', 'organ_receiver');
    query
      .leftJoinAndSelect('user.donor', 'donor')
      .leftJoinAndSelect('donor.organ', 'organ_donor');
    query
      .where('profile.type = :profileDonor', {
        profileDonor: ProfileTypes.DONOR,
      })
      .orWhere('profile.type = :profileReceiver', {
        profileReceiver: ProfileTypes.RECEIVER,
      });

    const users = await query.getMany();

    const responseData: IFindAllUser[] = [];
    for (const user of users) {
      responseData.push({
        id: user.id,
        email: user.email,
        name: user.name,
        rg: user.rg,
        cpf: user.cpf,
        phone: user.phone,
        birthDate: user.birthDate,
        gender: user.gender,
        bloodType: user.bloodType,
        responsible: user.responsible,
        address: user.address,
        profile: user.profile,
        receiver: user.receiver,
        donor: user.donor,
      });
    }
    return responseData;
  }

  async findOne(id: string): Promise<IFindAllUser> {
    const query = this.userDatasource.createQueryBuilder('user');
    query.select([
      'user.id',
      'user.email',
      'user.name',
      'user.rg',
      'user.cpf',
      'user.phone',
      'user.birthDate',
      'user.gender',
      'user.bloodType',
    ]);
    query.where('user.id = :id', { id });
    query.leftJoinAndSelect('user.address', 'address');
    query.leftJoinAndSelect('user.profile', 'profile');
    query.leftJoinAndSelect('user.responsible', 'responsible');
    query
      .leftJoinAndSelect('user.receiver', 'receiver')
      .leftJoinAndSelect('receiver.organ', 'organ_receiver');
    query
      .leftJoinAndSelect('user.donor', 'donor')
      .leftJoinAndSelect('donor.organ', 'organ_donor');
    query
      .where('profile.type = :profileDonor', {
        profileDonor: ProfileTypes.DONOR,
      })
      .orWhere('profile.type = :profileReceiver', {
        profileReceiver: ProfileTypes.RECEIVER,
      });

    const user = await query.getOne();
    const responseData: IFindAllUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      rg: user.rg,
      cpf: user.cpf,
      phone: user.phone,
      birthDate: user.birthDate,
      gender: user.gender,
      bloodType: user.bloodType,
      responsible: user.responsible,
      address: user.address,
      profile: user.profile,
      receiver: user.receiver,
      donor: user.donor,
    };
    return responseData;
  }
}
