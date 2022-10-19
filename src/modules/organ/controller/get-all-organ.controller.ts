import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllOrganService, IFindAllOrgan } from '../services';
import { GetOrganDto } from '../dto/get-all-organ.dto';

@ApiTags('Órgãos')
@Controller('api/v1/organ')
export class GetAllOrganController {
  constructor(private readonly organService: GetAllOrganService) {}

  @ApiOperation({
    summary: 'Retorna todos os órgãos cadastrados',
  })
  @ApiResponse({ status: 200, type: GetOrganDto })
  @Get()
  async findAll(): Promise<IFindAllOrgan[]> {
    return await this.organService.findAll();
  }
}
