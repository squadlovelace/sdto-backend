import { ApiProperty } from '@nestjs/swagger';
import { Institution } from 'src/infra/typeorm/entities/institution';

export class CreateCollaboratorDto {
  @ApiProperty()
  crm: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  institution: Institution;
}
