import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from 'src/infra/typeorm/entities/institution';
import { InstitutionController } from './controller/institution.controller'
import { InstitutionService } from './services/institution.service';

@Module({
  imports: [TypeOrmModule.forFeature([Institution])],
  controllers: [InstitutionController],
  providers: [InstitutionService],
  exports: [InstitutionService],

})
export class InstitutionModule {}
