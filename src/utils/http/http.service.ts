import { BadRequestException, Injectable } from '@nestjs/common';
import FormData from 'form-data';
import fetch, { RequestInit } from 'node-fetch';

@Injectable()
export class HttpService {
  async get(url: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(url, {
      method: 'GET',
      ...(options as any),
    });

    if (!response.ok) {
      throw new BadRequestException(
        `Error ${response.status}: ${response.statusText}`,
      );
    }
    return response.json();
  }

  async post(url: string, body: any, options: RequestInit = {}): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body) as any,
      ...options,
    });

    if (!response.ok) {
      throw new BadRequestException(
        `Error ${response.status}: ${response.statusText}`,
      );
    }
    return response.json();
  }

  async postFormData(
    url: string,
    formData: FormData,
    options: RequestInit = {},
  ): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...formData.getHeaders(),
        ...options.headers,
      },
      body: formData,
      ...options,
    });

    if (!response.ok) {
      throw new BadRequestException(
        `Error ${response.status}: ${response.statusText}`,
      );
    }

    return response.json();
  }

  async patch(url: string, body: any, options: RequestInit = {}): Promise<any> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body) as any,
      ...options,
    });

    if (!response.ok) {
      throw new BadRequestException(
        `Error ${response.status}: ${response.statusText}`,
      );
    }
    return response.json();
  }
}
