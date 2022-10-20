import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from '@entities/institution';
import { Profile } from '@entities/profile';
import { User } from '@entities/user';
import {
  CreateInstitutionController,
  GetAllInstitutionController,
  GetOneInstitutionController,
} from '@modules/institution/controller';
import {
  CreateInstitutionService,
  GetAllInstitutionService,
  GetOneInstitutionService,
} from '@modules/institution/services';
import { Collaborator } from '@infra/typeorm/entities';
import { InstitutionRepository } from '@infra/typeorm/repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Institution, User, Profile, Collaborator]),
  ],
  controllers: [CreateInstitutionController, GetAllInstitutionController,GetOneInstitutionController],
  providers: [
    CreateInstitutionService,
    GetAllInstitutionService,
    GetOneInstitutionService,
    InstitutionRepository,
  ],
  exports: [CreateInstitutionService],
})
export class InstitutionModule {}
