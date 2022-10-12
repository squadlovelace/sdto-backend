import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckController } from './app.controller';
import { CollaboratorModule } from './modules/collaborator/collaborator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    TerminusModule,
    HttpModule,
    CollaboratorModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
