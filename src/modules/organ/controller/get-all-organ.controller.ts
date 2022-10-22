import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllOrganService, IFindAllOrgan } from '../services';
import { GetOrganDto } from '../dto/get-all-organ.dto';
import { AuthGuard } from '@nestjs/passport';
import { OrganTypes } from '@shared/organ-types.enum';

@ApiTags('Órgãos')
@Controller('api/v1/organ')
export class GetAllOrganController {
  constructor(private readonly organService: GetAllOrganService) {}

  @ApiOperation({
    summary: 'Retorna todos os órgãos cadastrados',
  })
  @ApiResponse({ status: 200, type: GetOrganDto })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'número da pagina',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'total de registros a serem retornados',
  })
  @ApiQuery({
    name: 'organType',
    required: false,
    enum: OrganTypes,
    description: 'busca pelo o tipo de órgão',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: 'string',
    description: 'busca por nome ou parte do nome',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query() query: Omit<GetOrganDto, 'id'>,
  ): Promise<{ total: number; organs: IFindAllOrgan[] }> {
    return await this.organService.findAll(query);
  }
}
