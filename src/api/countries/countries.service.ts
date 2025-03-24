import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from 'src/utils/http/http.service';

@Injectable()
export class CountriesService {
  private apiUrl: string;
  private populationApi: string;
  private flagApi: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('API_URL');
    this.populationApi = this.configService.get<string>('POPULATION_API');
    this.flagApi = this.configService.get<string>('FLAG_API');
  }

  async getAvailableCountries() {
    const data = await this.httpService.get(
      `${this.apiUrl}/AvailableCountries`,
    );
    console.log(data);

    return data;
  }

  async getCountryInfo(code: string) {
    const [borders, population, flag] = await Promise.all([
      this.httpService.get(`${this.apiUrl}/CountryInfo/${code}`),
      this.httpService.get(`${this.populationApi}/countries/population`, {
        params: { country: code },
      }),
      this.httpService.get(`${this.flagApi}/countries/flag/images`, {
        params: { country: code },
      }),
    ]);

    return {
      borders: borders.data,
      population: population.data,
      flag: flag.data,
    };
  }
}
