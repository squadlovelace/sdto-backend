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
import {
  IFindAllInstitution,
  GetAllInstitutionService,
} from '@modules/institution/services';
import { GetAllInstitutionDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Instituição')
@Controller('api/v1/institution')
export class GetAllInstitutionController {
  constructor(
    private readonly getAllInstitutionService: GetAllInstitutionService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna todas as Instituições cadastradas na plataforma',
  })
  @ApiResponse({ status: 200, type: GetAllInstitutionDto })
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
    name: 'companyName',
    required: false,
    type: 'string',
    description: 'pesquisa pelo o nome da instituição',
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: Omit<GetAllInstitutionDto, 'id'>,
  ): Promise<{ total: number; institutions: IFindAllInstitution[] }> {
    return await this.getAllInstitutionService.find(query);
  }
}
