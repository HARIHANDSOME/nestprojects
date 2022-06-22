import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEntity } from 'src/entities/login.entity';
import { RegisterEntity } from 'src/entities/register.entity';
import { Repository } from 'typeorm';
import { RegisterBcrypt } from './../../helper/register.bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(RegisterEntity)
    public readonly regrepo: Repository<RegisterEntity>,
    @InjectRepository(LoginEntity)
    public readonly loginrepo: Repository<LoginEntity>,
    public readonly bcryptfile: RegisterBcrypt, // must include bcrypt file here
  ) {}

  async createregistration(registerdetails: any, res: any): Promise<any> {
    // Register table ////

    try {
      const sameemail = await this.getoneemail(registerdetails.email); // calling function name is enough to use  - getoneemail
      // we are getting a one specific email from registerdetails(registerdetails contains all) --- so registerdetails.email

      // Checking if same email exist while registaring a new customer
      console.log('its all', sameemail);

      if (sameemail) {
        return res.status(HttpStatus.NOT_FOUND).send('email already exists');
      }

      const register = new RegisterEntity(); // first register-alias name for Registerentity--(so register contains all included in registerentity)

      register.user_name = registerdetails.userName;
      register.phone_number = registerdetails.phoneNumber;

      const registerresult = await this.regrepo.save(register);

      /// Login table  //

      const login = new LoginEntity(); // first login-alias name for loginentity--(so login contains all included in loginentity)
      login.email = registerdetails.email; // the email we give
      login.hash = await this.bcryptfile.hashemail(login.email); // the email we give will also be hases and stored to hash in db
      login.user_id = register.id; // user_id and register's id must be same(we must give like that)

      const loginresult = await this.loginrepo.save(login);

      return res.status(HttpStatus.CREATED).send([registerresult, loginresult]);

      ////////////      //////////////////////
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'error is found',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////

  ///  getting the hashed email

  async gethashemail(hash: string) {
    return await this.loginrepo.findOne({ where: { hash } }); //getting hashed email
  }

  //getting normal one email(specific email)

  async getoneemail(email: string) {
    console.log(email);

    return await this.loginrepo.findOne({ where: { email: String(email) } }); //getting normal one-email(specific email)
  }

  async getuserid(user_id: string): Promise<RegisterEntity> {
    return await this.regrepo.findOne({ where: { id: String(user_id) } }); //user id = id ,userid in reg,id in login
  }
  // status also in reg,so calling,user-id contains all reg info so changing status to active

  // making the password and confirmPassword by getting original-email

  async settingpassword(email: string, fullpasswords: any): Promise<any> {
    const password = fullpasswords.password;
    const c_Password = fullpasswords.confirmPassword; // fullpassword contains password,confirmpassword
    if (password !== c_Password) {
      return 'password mismatching';
    }

    const savedemail = await this.getoneemail(email);
    console.log(savedemail);

    // in default password is null
    // console.log(savedemail.user_id); // updating the password to specific username's password

    const saveduserid = await this.getuserid(savedemail.user_id);
    // const saveduserid = await this.regrepo.findOne({where:{id:String(savedemail.user_id)}})
    // console.log(saveduserid);

    await this.regrepo.update(saveduserid.id, { status: 'active' }); // updating the status

    const hashedpassword = await this.bcryptfile.hashpassword(password); //hashed password used here to sit in place of original password

    return await this.loginrepo.update(savedemail.id, {
      password: hashedpassword,
      hash: null, //after hased password set in password ,we are changing hash value to null
    });
    //password-db column name--- fullpassword-param(above given) in that we need to store password only
  }

  ///////////    LOG IN    //////////////

  async loggingin(
    email: string,
    password: string,
    res: any,
  ): Promise<LoginEntity> {
    try {
      const presentemail = await this.getoneemail(email); // getting the specific email from postman
      console.log(presentemail); // and checking it is present in db or not

      if (!presentemail) {
        return res.status(HttpStatus.NOT_FOUND).send('email is not found');
      }

      // comparing the password given(during log in) is same as in db's password

      const comparing = await this.bcryptfile.compare(
        password,
        presentemail.password,
      ); //1st  password- given above 2nd password in db
      console.log(comparing);

      if (!true) {
        return res.status(HttpStatus.NOT_FOUND).send('wrong password');
      }

      return res.status(HttpStatus.NOT_FOUND).send('Successfully logged In');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'error is found',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
