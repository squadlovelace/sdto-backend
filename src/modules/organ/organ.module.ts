import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organ } from '@entities/organ';
import {
  CreateOrganService,
  GetAllOrganService,
  GetOneOrganService,
  UpdateOrganService,
  DeleteOrganService,
} from '@modules/organ/services';
import { OrganRepository } from '@infra/typeorm/repository';
import {
  CreateOrganController,
  GetAllOrganController,
  GetOneOrganController,
  UpdateOrganController,
  DeleteOrganController,
} from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([Organ])],
  controllers: [
    CreateOrganController,
    GetAllOrganController,
    GetOneOrganController,
    UpdateOrganController,
    DeleteOrganController,
  ],
  providers: [
    CreateOrganService,
    OrganRepository,
    GetAllOrganService,
    GetOneOrganService,
    UpdateOrganService,
    DeleteOrganService,
  ],
  exports: [CreateOrganService],
})
export class OrganModule {}
