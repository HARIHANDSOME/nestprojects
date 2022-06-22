import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginEntity } from './entities/login.entity';
import { RegisterEntity } from './entities/register.entity';
import { ModuleModule } from './module/module.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'CustomerDetails',
    entities: [RegisterEntity,LoginEntity],
    synchronize: true,
  }), ModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
