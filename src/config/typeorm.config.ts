import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'myPostgres',
  database: process.env.DB_DATABASE || 'portfolio-backend',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],

  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
};
