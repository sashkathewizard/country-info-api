import { Module } from '@nestjs/common';
import { CountriesModule } from './api/countries/countries.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), CountriesModule, UsersModule],
})
export class AppModule {}
