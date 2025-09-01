import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

const JwtConfigureModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
  }),
  inject: [ConfigService],
});

@Global()
@Module({
  imports: [HttpModule, JwtConfigureModule, ConfigModule],
  exports: [HttpModule, JwtConfigureModule, ConfigModule],
})
export class UserBaseModule {}
