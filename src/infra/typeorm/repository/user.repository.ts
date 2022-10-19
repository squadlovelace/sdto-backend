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
} from '@infra/typeorm/entities';
import {
  CpfInUseError,
  EmailInUseError,
  RgInUseError,
} from '@modules/exception';
import { CreateUserReceiverDto } from '@modules/user/dto';
import { ProfileTypes } from '@shared/profile-types.enum';

@Injectable()
export class UserRepository {
  constructor(private readonly datasource: DataSource) {}

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

      const organsToAdd = [];

      for (const data of input.organ) {
        const organ = await queryRunner.manager.findOne(Organ, {
          where: { id: data },
        });
        if (!organ) throw new NotFoundException('Órgão não encontrado.');
        organsToAdd.push(organ);
      }

      const receiver = queryRunner.manager.create(Receiver, {
        comorbidity: input.comorbidity,
        rgct: input.rgct,
        organ: organsToAdd,
      });

      const savedReceiver = await queryRunner.manager.save(receiver);

      const userReceiver = queryRunner.manager.create(User, {
        ...input,
        profile: profileType,
        address: savedAddress,
        receiver: savedReceiver,
      });

      await queryRunner.manager.save(userReceiver);
      await queryRunner.commitTransaction();
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus());
      }
    }
  }
}
