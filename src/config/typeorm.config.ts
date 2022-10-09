import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'sdtodb',
  entities: [__dirname + '/../**/*.{ts,js}'],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: true,
  migrations: [],
};
