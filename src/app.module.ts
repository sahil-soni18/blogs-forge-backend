import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/auth/auth.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, PortfolioModule],
})
export class AppModule {}
