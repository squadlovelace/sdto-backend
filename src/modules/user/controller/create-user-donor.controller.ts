import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDonorService } from '../services';
import { CreateUserDonorDto } from '../dto';

@ApiTags('Autenticação')
@Controller('api/v1/donor/signup')
export class CreateUserDonorController {
  constructor(
    private readonly createUserDonorService: CreateUserDonorService,
  ) {}

  @ApiOperation({
    summary: 'Cria um usuário com perfil de doador de órgãos',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreateUserDonorDto): Promise<void> {
    await this.createUserDonorService.add(input);
  }
}
