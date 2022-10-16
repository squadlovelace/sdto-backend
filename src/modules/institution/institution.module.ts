import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from '@entities/institution';
import { Profile } from '@entities/profile';
import { User } from '@entities/user';
import { CreateInstitutionController } from '@modules/institution/controller';
import { CreateInstitutionService } from '@modules/institution/services';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, User, Profile])],
  controllers: [CreateInstitutionController],
  providers: [CreateInstitutionService],
  exports: [CreateInstitutionService],
})
export class InstitutionModule {}
