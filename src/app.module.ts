import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { StorageModule } from './common/controllers/supabase-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    BlogsModule,
    StorageModule
  ],
})
export class AppModule {}
