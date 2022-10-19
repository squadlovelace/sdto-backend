import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organ } from '@entities/organ';
import {
  CreateOrganService,
  GetAllOrganService,
} from '@modules/organ/services';
import { OrganRepository } from '@infra/typeorm/repository';
import { CreateOrganController, GetAllOrganController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([Organ])],
  controllers: [CreateOrganController, GetAllOrganController],
  providers: [CreateOrganService, OrganRepository, GetAllOrganService],
  exports: [CreateOrganService],
})
export class OrganModule {}
