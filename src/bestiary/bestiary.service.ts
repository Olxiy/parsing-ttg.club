import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import * as fs from 'fs/promises'; // Используем промисы для работы с файлами асинхронно
import * as path from 'path';
import { IBestiaryEntry, IBestiaryPayload, IBestiaryPreviewInfo } from './bestiary.interface';

type enumVersion = '10' | '11';

const payload: IBestiaryPayload = {
  page: 0,
  size: 16000,
  search: { value: '', exact: false },
  order: [
    { field: 'exp', direction: 'asc' },
    { field: 'name', direction: 'asc' },
  ],
};

@Injectable()
export class BestiaryService {
  constructor(private readonly httpService: HttpService) {}
  private readonly filePath: string = path.join(__dirname, '../..', 'data');

  async saveDataToFile(data: any, fileName: string): Promise<void> {
    try {
      const fileFullPath = path.join(this.filePath, fileName);
      const dirPath = path.dirname(fileFullPath);

      await fs.mkdir(dirPath, { recursive: true });
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(fileFullPath, jsonData, 'utf8');
      console.log(`Data has been saved to ${fileName}`);
    } catch (error) {
      console.error('Error writing to JSON file:', error);
    }
  }

  fillListBestiary(): Observable<AxiosResponse<IBestiaryPreviewInfo[]>> {
    return this.httpService.post('https://ttg.club/api/v1/bestiary', payload).pipe(map((resp) => resp));
  }

  getBestiaryInfo(url: string): Observable<AxiosResponse<IBestiaryEntry>> {
    return this.httpService.post(`https://ttg.club/api/v1${url}`).pipe(map((resp) => resp));
  }

  getBestiaryFVTT(id: number, version: enumVersion): Observable<AxiosResponse<unknown[]>> {
    return this.httpService
      .get(`https://ttg.club/api/v1/fvtt/bestiary?id=${id}&version=V${version}`)
      .pipe(map((resp) => resp));
  }
}
