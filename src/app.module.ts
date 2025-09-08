import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/auth/auth.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET || 'default-secret',
        signOptions: { expiresIn: '1d' },
      }),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    PortfolioModule,
  ],
})
export class AppModule {}
