import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from 'src/infra/typeorm/entities/institution';
import { Repository } from 'typeorm';
import { Address } from 'src/infra/typeorm/entities/address';
import { Collaborator } from 'src/infra/typeorm/entities/collaborator';
import { User } from 'src/infra/typeorm/entities/user';
import { Profile } from 'src/infra/typeorm/entities/profile';

export interface IFindAllInstitution {
  id?: string;
  companyName?: string;
  cnpj?: string;
  address?: Address;
  collaborator?: Collaborator[];
}

@Injectable()
export class GetAllInstitutionService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
  ) {}

  async find(): Promise<IFindAllInstitution[]> {
    const query = this.institutionRepository.createQueryBuilder();
    query.select([
      'institution.id',
      'institution.companyName',
      'institution.cnpj',
    ]);
    query.from(Institution, 'institution');
    query
      .leftJoin('institution.collaborator', 'collaborator')
      .addSelect(['collaborator.id', 'collaborator.name']);
    const institutions = await query.getMany();
    const responseData: IFindAllInstitution[] = [];

    for (const institution of institutions) {
      responseData.push({
        id: institution.id,
        companyName: institution.companyName,
        cnpj: institution.cnpj,
        address: institution.address,
        collaborator: institution.collaborator,
      });
    }
    return responseData;
  }
}
