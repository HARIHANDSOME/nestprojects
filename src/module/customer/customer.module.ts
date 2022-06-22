import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from 'src/entities/register.entity';
import { LoginEntity } from 'src/entities/login.entity';
import { RegisterBcrypt } from 'src/helper/register.bcrypt';

@Module({
  imports:[TypeOrmModule.forFeature([RegisterEntity,LoginEntity]),], //must add every entity we craete
  providers: [CustomerService,RegisterBcrypt],// dont forgrt to add bycrypt file (whenever creating a new provider file)
  controllers: [CustomerController]
})
export class CustomerModule {}
