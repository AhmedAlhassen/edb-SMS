import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { AxiosError } from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { catchError, firstValueFrom } from 'rxjs';
import { Sms } from './type';

@Injectable()
export class T24Service {
    constructor(@Inject(Logger) private readonly logger: LoggerService,private readonly http : HttpService){}
    async parseSms(sms: any ){
       
        
        const options = {
            ignoreAttributes : true,
            leadingZeros: true,
            hex: true,
            skipLike: /\+[0-9]{10}/
        };
        const parser = new XMLParser(options);
        try {
            const data=  await parser.parse(sms.data)
       this.logger.log('T24Service',sms.data)
            return data.clickAPI.sendMsg;
        } catch (error) {
            this.logger.error(error)
        }
        
       
        
    }
    
  async  sendSmS(smsData:any){
            const req = new Sms(smsData.to, smsData.text);
         
            
            const {data} = await firstValueFrom( this.http.post('/send',req).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error.response.data);
                    throw 'An error happened!';
                  }),
            ))
            this.logger.log('T24Service',data)
            return data
    }
    
    
}
