import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InstitutionService } from 'src/modules/institution/services/institution.service';
import { CreateInstitutionDto } from '../dto/create-institution.dto';
import { Institution } from '../../../infra/typeorm/entities/institution';

@ApiTags('Instituição')
@Controller('api/v1/institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @ApiOperation({
    summary: 'Retorna todas as instituições',
  })
  @Get()
  async index() {
    return await this.institutionService.findAll();
  }

  @ApiOperation({
    summary: 'Cria uma instituição e informa o colaborador responsável',
  })
  @Post()
  async create(@Body() body: CreateInstitutionDto): Promise<Institution> {
    return await this.institutionService.create(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.institutionService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
    return await this.institutionService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.institutionService.DeleteById(id);
  }
}
