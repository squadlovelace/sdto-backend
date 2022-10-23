import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateCollaboratorDto extends OmitType(CreateUserDto, [
  'responsible',
  'address',
  'organ',
]) {
  @ApiProperty()
  crm: string;

  @ApiProperty()
  position: string;
}
