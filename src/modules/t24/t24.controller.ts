import {
  Body,
  Controller,
  Inject,
  Logger,
  LoggerService,
  Post,
  Req,
} from '@nestjs/common';
import { T24Service } from './t24.service';

@Controller('t24')
export class T24Controller {
  constructor(
    private t24Service: T24Service,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post('sendsms')
  async sendSms(@Req() request: Request) {
    // this.logger.log('T24Controller',{message})
    this.logger.log('T24Controller', request.body);

    const smsobj = await this.t24Service.parseSms(request?.body);

    // this.logger.log('T24Controller', {smsobj})
    const data = await this.t24Service.sendSmS(smsobj);

    this.logger.log('T24Controller', data);

    return '<?xml version="1.0"?><clickAPI><sendMsgResp>003, Success<sequence_no></sequence_no></sendMsgResp></clickAPI>';
  }
}
