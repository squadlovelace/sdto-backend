import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckController } from './app.controller';
import { InstitutionModule } from '@modules/institution/institution.module';
import { OrganModule } from '@modules/organ/organ.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    OrganModule,
    TerminusModule,
    HttpModule,
    InstitutionModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
