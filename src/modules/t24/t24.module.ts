import { Logger, Module } from '@nestjs/common';
import { T24Service } from './t24.service';
import { T24Controller } from './t24.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[  
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        baseURL: configService.get('SMS_API')
        
      }),
      inject: [ConfigService],
    })],
  providers: [T24Service,Logger],
  controllers: [T24Controller],
  exports: [T24Service]
})
export class T24Module {}
