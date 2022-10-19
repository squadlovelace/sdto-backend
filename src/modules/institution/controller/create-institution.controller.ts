import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateInstitutionService } from '../services';
import { CreateInstitutionDto } from '../dto';

@ApiTags('Instituição')
@Controller('api/v1/institution')
export class CreateInstitutionController {
  constructor(
    private readonly createInstitutionService: CreateInstitutionService,
  ) {}
  @ApiOperation({
    summary: 'Cria uma instituição e informa o colaborador responsável',
  })
  @Post()
  async create(@Body() data: CreateInstitutionDto): Promise<void> {
    await this.createInstitutionService.add(data);
  }
}
