import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_CONNECTION as 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    join(__dirname, '../modules/**/*.entity.{ts,js}'),
    join(__dirname, '../modules/**/*.view.{ts,js}'),
  ],
  synchronize: true,
  logging: false,
};
