import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organ } from '@entities/organ';
import { CreateOrganService } from '@modules/organ/services';

@Module({
  imports: [TypeOrmModule.forFeature([Organ])],
  providers: [CreateOrganService],
  exports: [CreateOrganService],
})
export class OrganModule {}
