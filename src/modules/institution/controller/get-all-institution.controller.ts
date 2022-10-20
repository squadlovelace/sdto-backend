import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
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
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IFindAllInstitution[]> {
    return await this.getAllInstitutionService.find();
  }
}
