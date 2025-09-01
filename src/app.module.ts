import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule],
})
export class AppModule {}
