import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrganService } from '../services';
import { CreateOrganDto } from '../dto/create-organ.dto';

@ApiTags('Órgãos')
@Controller('api/v1/organ')
export class CreateOrganController {
  constructor(private readonly organService: CreateOrganService) {}

  @ApiOperation({
    summary: 'Cria um órgão',
  })
  @Post()
  async create(@Body() input: CreateOrganDto): Promise<void> {
    await this.organService.add(input);
  }
}
