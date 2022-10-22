import { ApiProperty } from '@nestjs/swagger';

export class SigninOutputDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  profile: string;
}
