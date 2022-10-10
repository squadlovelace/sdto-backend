import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { HealthCheckController } from './app.controller';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
