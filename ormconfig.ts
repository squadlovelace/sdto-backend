import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'sdto',
  password: 'sdto@pass',
  database: 'sdtodb',
  logging: true,
  synchronize: false,
  entities: ['src/infra/typeorm/entities/*.ts'],
  migrations: ['src/infra/typeorm/migrations/*.ts'],
} as DataSourceOptions);
