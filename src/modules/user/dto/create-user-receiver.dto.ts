import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class CreateUserReceiverDto extends CreateUserDto {
  @ApiProperty()
  rgct: string;

  @ApiProperty()
  comorbidity: string;
}
