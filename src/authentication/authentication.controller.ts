import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';

@Controller('login')
export class AuthenticationController {
    constructor(private auth:AuthenticationService){}
    @Post()
    login(@Body() data:{email:string; password:string},@Res() res:Response){
        return this.auth.login(data,res);
    }
}
