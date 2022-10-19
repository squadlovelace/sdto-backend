import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserReceiverService } from '../services';
import { CreateUserReceiverDto } from '../dto';

@ApiTags('Receptor')
@Controller('api/v1/user-receiver')
export class CreateUserReceiverController {
  constructor(
    private readonly createUserReceiverService: CreateUserReceiverService,
  ) {}

  @ApiOperation({
    summary: 'Cria um usuário com perfil de receptor de órgãos',
  })
  @Post()
  async create(@Body() input: CreateUserReceiverDto): Promise<void> {
    await this.createUserReceiverService.add(input);
  }
}
