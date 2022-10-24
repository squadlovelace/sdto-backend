import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserReceiverService } from '../services';
import { CreateUserReceiverDto } from '../dto';

@ApiTags('Autenticação')
@Controller('api/v1/receiver/signup')
export class CreateUserReceiverController {
  constructor(
    private readonly createUserReceiverService: CreateUserReceiverService,
  ) {}

  @ApiOperation({
    summary: 'Cria um usuário com perfil de receptor de órgãos',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreateUserReceiverDto): Promise<void> {
    await this.createUserReceiverService.add(input);
  }
}
