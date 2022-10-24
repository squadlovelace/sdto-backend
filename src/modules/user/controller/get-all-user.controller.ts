import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { GetAllUserService, IFindAllUser } from '@modules/user/services';
import { GetAllUserDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Usuários')
@Controller('api/v1/user')
export class GetAllUserController {
  constructor(private readonly getAllUserService: GetAllUserService) {}

  @Get()
  @ApiOperation({
    summary:
      'Retorna todos os usuários com perfil de DOADOR ou RECEPTOR cadastrados na plataforma',
  })
  @ApiResponse({ status: 200, type: GetAllUserDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IFindAllUser[]> {
    return await this.getAllUserService.find();
  }
}
