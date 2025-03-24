import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':userId/calendar/holidays')
  addHolidays(
    @Param('userId') userId: string,
    @Body()
    {
      countryCode,
      year,
      holidays,
    }: { countryCode: string; year: number; holidays?: string[] },
  ) {
    return this.usersService.addHolidays(userId, countryCode, year, holidays);
  }

  @Get(':userId/calendar/holidays')
  getHolidays(@Param('userId') userId: string) {
    return this.usersService.getAllHolidays(userId);
  }

  @Post()
  createUser(@Body() data: CreateUserDTO) {
    return this.usersService.createUser(data);
  }

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }
}
