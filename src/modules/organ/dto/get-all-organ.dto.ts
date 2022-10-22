import { ApiProperty } from '@nestjs/swagger';
import { OrganTypes } from '@shared/organ-types.enum';
import { BaseQueryParametersDto } from '@shared/base-query-parameters.dto';

export class GetOrganDto extends BaseQueryParametersDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ischemiaTime: string;

  @ApiProperty({ type: 'enum', enum: OrganTypes })
  organType: OrganTypes;
}
