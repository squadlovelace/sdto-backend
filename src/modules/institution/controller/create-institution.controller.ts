import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: CreateInstitutionDto): Promise<void> {
    await this.createInstitutionService.add(data);
  }
}
