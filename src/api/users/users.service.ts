import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HolidayRepository } from 'src/database/repos/holiday.repo';
import { UserRepository } from 'src/database/repos/user.repo';
import { HttpService } from 'src/utils/http/http.service';

@Injectable()
export class UsersService {
  private apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private readonly userRepo: UserRepository,
    private readonly holidayRepo: HolidayRepository,
  ) {
    this.apiUrl = this.configService.get<string>('API_URL');
  }

  async getAllHolidays(userId: string) {
    return await this.holidayRepo.findAll({ userId });
  }

  async addHolidays(
    userId: string,
    countryCode: string,
    year: number,
    holidays?: string[],
  ) {
    const { data } = await this.httpService.get(
      `${this.apiUrl}/PublicHolidays/${year}/${countryCode}`,
    );

    const filteredHolidays = holidays
      ? data.filter((h) => holidays.includes(h.localName))
      : data;

    const createdHolidays = await Promise.all(
      filteredHolidays.map((holiday) =>
        this.holidayRepo.create({
          ...holiday,
          userId,
        }),
      ),
    );

    return { userId, holidays: createdHolidays };
  }

  async createUser(data) {
    return await this.userRepo.create(data);
  }
}
