import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  IFindAllInstitution,
  GetAllInstitutionService,
} from '@modules/institution/services';

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
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IFindAllInstitution[]> {
    return await this.getAllInstitutionService.find();
  }
}
