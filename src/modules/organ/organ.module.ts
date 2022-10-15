import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organ } from '../../infra/typeorm/entities/organ';
import { CreateOrganService } from './services/create-organ.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organ])],
  providers: [CreateOrganService],
  exports: [CreateOrganService],
})
export class OrganModule {}
