import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllOrganService, IFindAllOrgan } from '../services';
import { GetOrganDto } from '../dto/get-all-organ.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Órgãos')
@Controller('api/v1/organ')
export class GetAllOrganController {
  constructor(private readonly organService: GetAllOrganService) {}

  @ApiOperation({
    summary: 'Retorna todos os órgãos cadastrados',
  })
  @ApiResponse({ status: 200, type: GetOrganDto })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<IFindAllOrgan[]> {
    return await this.organService.findAll();
  }
}
