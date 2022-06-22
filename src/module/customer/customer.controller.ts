import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';
import { RegisterDto } from 'src/dtos/register.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(public readonly customerserv: CustomerService) {}

  @Post('/add')
  // @UsePipes(ValidationPipe)
  makingregistration(@Body() fillregistration: RegisterDto, @Res() res: any) {
    // console.log(fillregistration);

    return this.customerserv.createregistration(fillregistration, res);
  }

  @Get('/:hash')
  hashemail(@Param('hash') hash: string) {
    return this.customerserv.gethashemail(hash);
  } // when we call this hashed email,it gives all details

  /// login --- posting email --- it asks us to give password and confirm password in postman --
  // then the password will be saved to db columns password

  @Post('/getall/:email')
  makingpassword(
    @Param('email') email: string,
    @Body() fullpasswords: LoginDto,
  ) {
    return this.customerserv.settingpassword(email, fullpasswords);
  }
  // fullpassword contains password,confirmpassword

  @Get('/original/:email')
  oneemail(@Param('email') email: string) {
    console.log(email);

    return this.customerserv.getoneemail(email); //just checking
  }

  @Post('/login')
  makinglogin(@Body() body: any, @Res() res: any) {
    // body has email and password
    return this.customerserv.loggingin(body.email, body.password, res); 
  }

}
                 
