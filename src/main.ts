import { NestFactory } from '@nestjs/core'
import { WinstonModule,utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from "winston";
import { AppModule } from './app.module';

async function bootstrap() {
const app = await NestFactory.create(AppModule,{
    logger: WinstonModule.createLogger({
          handleExceptions: true,
          format: winston.format.json(),
          transports: [
                new winston.transports.Console({
                      format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        ),
                  }),
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'debug.log',level:'debug' }),
                new winston.transports.File({ filename: 'info.log',level:'info' }),
                new winston.transports.File({ filename: 'warn.log',level:'warn' }),
                new winston.transports.File({ filename: 'verbose.log',level:'verbose' }),
          ],
          exceptionHandlers: [
            new winston.transports.File({ filename: 'exceptions.log' })
          ]
    })
  });
  
  await app.listen(8085);
}
bootstrap();
