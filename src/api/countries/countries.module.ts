import { Module } from '@nestjs/common';
import HttpModule from 'src/utils/http/http.module';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
