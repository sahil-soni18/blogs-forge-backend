// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { join } from 'path';
// import * as dotenv from 'dotenv';

// dotenv.config();

// console.log(process.env.DATABASE_URL)
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
//   ssl: { rejectUnauthorized: false },
//   // dropSchema: process.env.NODE_ENV !== 'production',
//   dropSchema: false,
//   synchronize: process.env.NODE_ENV !== 'production',
//   logging: process.env.NODE_ENV !== 'production',
// };



import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  
  // Fix SSL configuration for different environments
  ssl: process.env.NODE_ENV === 'production' ? { 
    rejectUnauthorized: false 
  } : false,
  
  // Always false in production for safety
  dropSchema: false,
  
  // Be more cautious with synchronize
  synchronize: process.env.NODE_ENV === 'development',
  
  // Enable logging only in development
  logging: process.env.NODE_ENV === 'development',
  
  // Add connection options for better stability
  extra: {
    // Connection pool settings
    max: 20,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
  },
};