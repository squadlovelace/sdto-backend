import { ApiProperty } from '@nestjs/swagger';
import { OrganTypes } from '@shared/organ-types.enum';

export class CreateOrganDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  ischemiaTime: string;

  @ApiProperty({ type: 'enum', enum: OrganTypes })
  organType: OrganTypes;
}
