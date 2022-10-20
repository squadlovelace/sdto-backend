import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDonorService } from '../services';
import { CreateUserDonorDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Usuário')
@Controller('api/v1/donor')
export class CreateUserDonorController {
  constructor(
    private readonly createUserDonorService: CreateUserDonorService,
  ) {}

  @ApiOperation({
    summary: 'Cria um usuário com perfil de doador de órgãos',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() input: CreateUserDonorDto): Promise<void> {
    await this.createUserDonorService.add(input);
  }
}
