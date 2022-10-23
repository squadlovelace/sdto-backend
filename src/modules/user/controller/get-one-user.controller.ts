import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { GetOneUserService, IFindAllUser } from '@modules/user/services';
import { GetAllUserDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Usuários')
@Controller('api/v1/user')
export class GetOneUserController {
  constructor(private readonly getOneUserService: GetOneUserService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna um usuário cadastrado na plataforma',
  })
  @ApiResponse({ status: 200, type: GetAllUserDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findOne(@Param() id: string): Promise<IFindAllUser> {
    return await this.getOneUserService.findOne(id);
  }
}
