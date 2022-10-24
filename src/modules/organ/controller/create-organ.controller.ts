import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrganService } from '../services';
import { CreateOrganDto } from '../dto/create-organ.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Órgãos')
@Controller('api/v1/organ')
export class CreateOrganController {
  constructor(private readonly organService: CreateOrganService) {}

  @ApiOperation({
    summary: 'Cria um órgão',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreateOrganDto): Promise<void> {
    await this.organService.add(input);
  }
}
