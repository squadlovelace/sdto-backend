import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  IFindAllInstitution,
  GetOneInstitutionService,
} from '@modules/institution/services';
import { GetAllInstitutionDto } from '../dto';

@ApiTags('Instituição')
@Controller('api/v1/institution')
export class GetOneInstitutionController {
  constructor(
    private readonly getOneInstitutionService: GetOneInstitutionService,
  ) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna uma Instituição cadastrada na plataforma',
  })
  @ApiResponse({ status: 200, type: GetAllInstitutionDto })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<IFindAllInstitution> {
    return await this.getOneInstitutionService.findById(id);
  }
}
