import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  IFindAllInstitution,
  GetOneInstitutionService,
} from '@modules/institution/services';
import { GetAllInstitutionDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';

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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<IFindAllInstitution> {
    return await this.getOneInstitutionService.findById(id);
  }
}
