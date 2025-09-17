import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DATABASE_URL)
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  ssl: { rejectUnauthorized: false },
  // dropSchema: process.env.NODE_ENV !== 'production',
  dropSchema: false,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
};
