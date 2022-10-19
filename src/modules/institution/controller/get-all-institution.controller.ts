import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  IFindAllInstitution,
  GetAllInstitutionService,
} from '@modules/institution/services';
import { GetAllInstitutionDto } from '../dto';

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
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IFindAllInstitution[]> {
    return await this.getAllInstitutionService.find();
  }
}
