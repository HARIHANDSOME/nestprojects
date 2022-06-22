import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) // without special char
  userName: String;

  // @IsNumber()
  @IsNotEmpty()
  // @Matches("(\\d){10,10}") 
  @Matches(/^[0-9]{10}$/) // -- 10 dugit validation

  phoneNumber: string;

  @IsEmail()
  email: string;

  // @IsString()
  // @MinLength(8)
  // @MaxLength(21)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  // password: string;
}

//  "userName":   "phoneNumber":   "email":   "password:"

// pass: stanger    --    balajhgfhfhi@gmail.com
// pass:itshari     --    hari4@gmail.com
// pass:itsbalaji   --    balaji3@gmail.com

//    pass:strangerS1#     ---            harsavci@gmail.com
// pass:hariH12%           ---                hari@gmail.com


//// correct postings  //////

// "userName":"sanjvgSD56", 
// "phoneNumber":9533134,  
// "email":"hariaf@gmail.com"
// "password":"hariH123"

// "userName":"Hari54", 
// "phoneNumber":95331324,  
// "email":"hari4@gmail.com"
// "password":"hariH321"

// "userName":"Balaj6", 
// "phoneNumber":953311324,  
// "email":"balaji3@gmail.com"
// "password":Balaji31


// "userName":"newGuy1", 
// "phoneNumber":"1234567890",  
// "email":"baji3@gmail.com"
// "password":Bala1%78
