import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from 'src/infra/typeorm/entities/institution';
import { Profile } from 'src/infra/typeorm/entities/profile';
import { User } from 'src/infra/typeorm/entities/user';
import { CreateInstitutionController } from './controller/create-institution.controller';
import { CreateInstitutionService } from './services/create-institution.service';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, User, Profile])],
  controllers: [CreateInstitutionController],
  providers: [CreateInstitutionService],
  exports: [CreateInstitutionService],
})
export class InstitutionModule {}
