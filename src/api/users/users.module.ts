import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import HttpModule from 'src/utils/http/http.module';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule, DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
