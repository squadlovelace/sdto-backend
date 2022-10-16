import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from '@entities/collaborator';
import { CollaboratorController } from '@modules/collaborator/controller';
import { CollaboratorService } from '@modules/collaborator/services';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborator])],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
  exports: [CollaboratorService],
})
export class CollaboratorModule {}
