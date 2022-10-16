import { ApiProperty } from '@nestjs/swagger';

export class CreateCollaboratorDto {
  @ApiProperty()
  crm: string;

  @ApiProperty()
  position: string;
}
