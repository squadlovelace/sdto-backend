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
import { IFindAllOrgan } from '../services';
import { GetOrganDto } from '../dto/get-all-organ.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetOneOrganService } from '../services/get-one-organ.service';

@ApiTags('Órgãos')
@Controller('api/v1/organ')
export class GetOneOrganController {
  constructor(private readonly organService: GetOneOrganService) {}

  @ApiOperation({
    summary: 'Retorna por id um órgão cadastrado',
  })
  @ApiResponse({ status: 200, type: GetOrganDto })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IFindAllOrgan> {
    return await this.organService.findById(id);
  }
}
