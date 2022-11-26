import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateCollaboratorDto extends OmitType(CreateUserDto, [
  'address',
  'organ',
]) {
  @ApiProperty()
  crm: string;

  @ApiProperty()
  position: string;
}
