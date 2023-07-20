// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import User from './user.entity'; // Use 'User' as the default import
import config from '../ormconfig'; // Import the configuration

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
