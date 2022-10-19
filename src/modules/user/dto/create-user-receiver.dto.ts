import { ApiProperty } from '@nestjs/swagger';
import { BloodTypes } from 'src/shared/blood-types.enum';

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

export class CreateUserReceiverDto {
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
  rgct: string;

  @ApiProperty()
  comorbidity: string;

  @ApiProperty()
  organ: string[];

  @ApiProperty({ type: AddressData })
  address: AddressData;
}
