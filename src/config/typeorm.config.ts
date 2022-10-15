import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'sdtodb',
  entities: [__dirname + '/../**/*.{ts,js}'],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: true,
  migrations: [],
};
