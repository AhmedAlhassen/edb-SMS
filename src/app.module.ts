import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { T24Module } from './modules/t24/t24.module';

@Module({
  imports: [T24Module,
    ConfigModule.forRoot({
      isGlobal: true,
      
    })],
 
  providers: [Logger],
})
export class AppModule {}
