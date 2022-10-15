import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const connectionSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'sdtodb',
  logging: true,
  synchronize: false,
  entities: ['src/infra/typeorm/entities/*.ts'],
  migrations: ['src/infra/typeorm/migrations/*.ts'],
} as DataSourceOptions);
