import { v4 as uuidv4 } from 'uuid';
import * as date from 'date-and-time'
export class Sms{
    id:string;
    code:string;
    phone:string;
    priority:string;
    text:string;
    messageDateTime:string
    
    constructor(phone:string,text:string){
        this.id = uuidv4();
        this.code = "1";
        this.phone = phone;
        this.text = text;
        this.messageDateTime = date.format(new Date(),'YYYY-MM-DD HH:mm:ss')
        
    }
}