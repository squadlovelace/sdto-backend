import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserReceiverService } from '../services';
import { CreateUserReceiverDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Usuário')
@Controller('api/v1/receiver')
export class CreateUserReceiverController {
  constructor(
    private readonly createUserReceiverService: CreateUserReceiverService,
  ) {}

  @ApiOperation({
    summary: 'Cria um usuário com perfil de receptor de órgãos',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() input: CreateUserReceiverDto): Promise<void> {
    await this.createUserReceiverService.add(input);
  }
}
