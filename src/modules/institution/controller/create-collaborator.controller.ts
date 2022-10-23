import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCollaboratorService } from '../services/create-collaborator.service';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';

@ApiTags('Instituição')
@Controller('api/v1/institution')
export class CreateCollaboratorController {
  constructor(
    private readonly createCollaboratorService: CreateCollaboratorService,
  ) {}
  @ApiOperation({
    summary: 'Cria um colaborador',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/collaborator')
  async create(
    @Body() data: CreateCollaboratorDto,
    @Param('id') idInstitution: string,
  ): Promise<void> {
    await this.createCollaboratorService.add(data, idInstitution);
  }
}
