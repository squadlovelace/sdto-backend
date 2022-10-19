import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDonorService } from '../services';
import { CreateUserDonorDto } from '../dto';

@ApiTags('Usuário')
@Controller('api/v1/user-donor')
export class CreateUserDonorController {
  constructor(
    private readonly createUserDonorService: CreateUserDonorService,
  ) {}

  @ApiOperation({
    summary: 'Cria um usuário com perfil de doador de órgãos',
  })
  @Post()
  async create(@Body() input: CreateUserDonorDto): Promise<void> {
    await this.createUserDonorService.add(input);
  }
}
