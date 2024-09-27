import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import {
  IBestiaryEntry,
  IBestiaryPayload,
  IBestiaryPreviewInfo,
} from './bestiary.interface';

type enumVersion = '10' | '11';

const payload: IBestiaryPayload = {
  page: 0,
  size: 16000,
  search: {
    value: '',
    exact: false,
  },
  order: [
    {
      field: 'exp',
      direction: 'asc',
    },
    {
      field: 'name',
      direction: 'asc',
    },
  ],
};

@Injectable()
export class BestiaryService {
  constructor(private readonly httpService: HttpService) {}
  private readonly filePath: string = path.join(__dirname, '../..', 'data');

  saveDataToFile(data: any, fileName: string): void {
    console.log(this.filePath);
    try {
      const dirPath = path.dirname(this.filePath + fileName);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(this.filePath, jsonData, 'utf8');
      console.log('Data has been saved to JSON file.');
    } catch (error) {
      console.error('Error writing to JSON file:', error);
    }
  }

  fillListBestiary(): Observable<AxiosResponse<IBestiaryPreviewInfo[]>> {
    return this.httpService
      .post(`https://ttg.club/api/v1/bestiary`, payload)
      .pipe(map((resp) => resp));
  }

  getSelectedBestiaryInfo(
    url: string,
  ): Observable<AxiosResponse<IBestiaryEntry>> {
    return this.httpService
      .post(`https://ttg.club/api/v1${url}`)
      .pipe(map((resp) => resp));
  }

  getSelectedBestiaryFVTT(
    id: number,
    version: enumVersion,
  ): Observable<AxiosResponse<unknown[]>> {
    return this.httpService
      .get(`https://ttg.club/api/v1/fvtt/bestiary?id=${id}&version=V${version}`)
      .pipe(map((resp) => resp));
  }
}
