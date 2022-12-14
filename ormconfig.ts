import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  logging: true,
  synchronize: false,
  entities: ['src/infra/typeorm/entities/*.ts'],
  migrations: ['src/infra/typeorm/migrations/*.ts'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
} as DataSourceOptions);
