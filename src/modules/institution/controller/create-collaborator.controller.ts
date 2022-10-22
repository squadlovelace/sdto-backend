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
import { CreateCollaboratorService } from '../services/create-collaborator.service';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';

@ApiTags('Colaborador')
@Controller('api/v1/collaborator')
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
  @Post()
  async create(
    @Body() data: CreateCollaboratorDto,
    idInstitution: string,
  ): Promise<void> {
    await this.createCollaboratorService.add(data, idInstitution);
  }
}
