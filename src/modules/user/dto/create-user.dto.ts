import { ApiProperty } from '@nestjs/swagger';
import { BloodTypes } from '@shared/blood-types.enum';

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

export class ResponsibleData {
  @ApiProperty()
  name: string;

  @ApiProperty()
  relationship: string;
}

export class CreateUserDto {
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

  // @ApiProperty({ type: ResponsibleData })
  // responsible: ResponsibleData;

  @ApiProperty()
  organ: string;

  @ApiProperty({ type: AddressData })
  address: AddressData;
}
