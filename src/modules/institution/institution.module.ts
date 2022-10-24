import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from '@entities/institution';
import { Profile } from '@entities/profile';
import { User } from '@entities/user';
import {
  CreateCollaboratorController,
  CreateInstitutionController,
  GetAllInstitutionController,
  GetOneInstitutionController,
} from '@modules/institution/controller';
import {
  CreateCollaboratorService,
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
  controllers: [
    CreateInstitutionController,
    GetAllInstitutionController,
    GetOneInstitutionController,
    CreateCollaboratorController,
  ],
  providers: [
    CreateInstitutionService,
    GetAllInstitutionService,
    GetOneInstitutionService,
    CreateCollaboratorService,
    InstitutionRepository,
  ],
  exports: [CreateInstitutionService],
})
export class InstitutionModule {}
