import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common';
import { CollaboratorService } from '../services/collaborator.service';

@Controller('api/v1/collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Get()
  async index() {
    return await this.collaboratorService.findAll();
  }

  @Post()
  async create(@Body() body) {
    return await this.collaboratorService.create(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.collaboratorService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
    return await this.collaboratorService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.collaboratorService.DeleteById(id);
  }
}
