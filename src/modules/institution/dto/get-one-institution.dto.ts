import { ApiProperty } from '@nestjs/swagger';

class UserData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

class ColaboratorData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  crm?: string;

  @ApiProperty()
  position?: string;

  @ApiProperty({ type: UserData })
  user: UserData;
}

class AddressData {
  @ApiProperty()
  id: string;

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

export class GetOneInstitutionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty({ type: AddressData })
  address: AddressData;

  @ApiProperty({ type: ColaboratorData })
  collaborator: ColaboratorData;
}
