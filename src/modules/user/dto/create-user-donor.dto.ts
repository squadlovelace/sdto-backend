import { ApiProperty } from '@nestjs/swagger';
import { DonorType } from '@shared/donor-type.enum';
import { CreateUserDto } from './create-user.dto';

export class CreateUserDonorDto extends CreateUserDto {
  @ApiProperty({ type: 'enum', enum: DonorType })
  type: DonorType;
}
