import { ApiProperty } from '@nestjs/swagger';
import { BloodTypes } from '@shared/blood-types.enum';
import { DonorType } from '@shared/donor-type.enum';
import { OrganTypes } from '@shared/organ-types.enum';
import { ProfileTypes } from '@shared/profile-types.enum';

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

export class ProfileData {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: 'enum', enum: ProfileTypes })
  type: ProfileTypes;

  @ApiProperty()
  description: string;
}

export class OrganData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ischemiaTime: string;

  @ApiProperty({ type: 'enum', enum: OrganTypes })
  organType: OrganTypes;
}

export class ReceiverData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  rgct: string;

  @ApiProperty()
  comorbidity: string;

  @ApiProperty({ type: OrganData, isArray: true })
  organ: OrganData;
}

export class DonorData {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: 'enum', enum: DonorType })
  type: DonorType;

  @ApiProperty({ type: OrganData, isArray: true })
  organ: OrganData;
}

export class GetAllUserDto {
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

  @ApiProperty({ type: ResponsibleData })
  responsible: ResponsibleData;

  @ApiProperty({ type: AddressData })
  address: AddressData;

  @ApiProperty({ type: ProfileData })
  profile: ProfileData;

  @ApiProperty({ type: ReceiverData })
  receiver: ReceiverData;

  @ApiProperty({ type: DonorData })
  donor: DonorData;
}
