import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  password: string;
}
