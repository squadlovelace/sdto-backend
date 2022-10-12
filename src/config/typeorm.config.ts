import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'sdto',
  password: 'sdto@pass',
  database: 'sdtodb',
  entities: [__dirname + '/../**/*.{ts,js}'],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: true,
  migrations: [],
};
