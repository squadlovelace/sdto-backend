import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateOrganService } from '../services/update-organ.service';
import { CreateOrganDto } from '../dto/create-organ.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Órgãos')
@Controller('api/v1/organ')
export class UpdateOrganController {
  constructor(private readonly organService: UpdateOrganService) {}

  @ApiOperation({
    summary: 'Atualiza um órgão cadastrado',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Put(':id')
  async update(@Body() input: CreateOrganDto): Promise<void> {
    await this.organService.add(input);
  }
}
