import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from '@entities/institution';
import { Profile } from '@entities/profile';
import { User } from '@entities/user';
import {
  CreateInstitutionController,
  GetAllInstitutionController,
} from '@modules/institution/controller';
import {
  CreateInstitutionService,
  GetAllInstitutionService,
} from '@modules/institution/services';
import { Collaborator } from '@infra/typeorm/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Institution, User, Profile, Collaborator]),
  ],
  controllers: [CreateInstitutionController, GetAllInstitutionController],
  providers: [CreateInstitutionService, GetAllInstitutionService],
  exports: [CreateInstitutionService],
})
export class InstitutionModule {}
