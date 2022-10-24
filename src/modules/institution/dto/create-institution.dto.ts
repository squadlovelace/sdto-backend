import { ApiProperty } from '@nestjs/swagger';
import { BloodTypes } from 'src/shared/blood-types.enum';

export class UserColaboratorData {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  rg: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  gender: string;

  @ApiProperty({ type: 'enum', enum: BloodTypes })
  bloodType: BloodTypes;

  @ApiProperty()
  crm?: string;

  @ApiProperty()
  position?: string;
}

export class AddressData {
  @ApiProperty()
  street: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  complement: string;
}

export class CreateInstitutionDto {
  @ApiProperty()
  companyName: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty({ type: UserColaboratorData })
  collaborator: UserColaboratorData;

  @ApiProperty({ type: AddressData })
  address: AddressData;
}
