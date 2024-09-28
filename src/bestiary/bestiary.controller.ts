import { Controller, Get } from '@nestjs/common';
import { BestiaryService } from './bestiary.service';
import { firstValueFrom } from 'rxjs';
import { delay } from 'src/common/utils';

@Controller('bestiary')
export class BestiaryController {
  constructor(private readonly bestiaryService: BestiaryService) {}

  @Get()
  async getAllBestiary() {
    const arrayBestiaryInfo = [];
    const arrayBestiaryFVTT = [];
    let counter = 0;

    try {
      const fillListBestiary = await firstValueFrom(this.bestiaryService.fillListBestiary());

      if (fillListBestiary?.data?.length) {
        for (const item of fillListBestiary.data) {
          await delay(100);
          counter++;
          console.log('Processing:', item.url);
          console.log('Left data:', fillListBestiary.data.length - counter);

          const bestiaryData = await firstValueFrom(this.bestiaryService.getBestiaryInfo(item.url));
          arrayBestiaryInfo.push(bestiaryData.data);

          let bestiaryFVTT = null;

          try {
            bestiaryFVTT = await firstValueFrom(this.bestiaryService.getBestiaryFVTT(bestiaryData?.data?.id, '11'));
          } catch (error) {
            console.error(`Error fetching FVTT data with version 11 for ID ${bestiaryData?.data?.id}:`, error);
            try {
              bestiaryFVTT = await firstValueFrom(this.bestiaryService.getBestiaryFVTT(bestiaryData?.data?.id, '10'));
            } catch (error) {
              console.error(`Error fetching FVTT data with version 10 for ID ${bestiaryData?.data?.id}:`, error);
              console.log(`Skipping ID ${bestiaryData?.data?.id}`);
              continue;
            }
          }

          if (bestiaryFVTT) {
            arrayBestiaryFVTT.push(bestiaryFVTT.data);
          }
        }

        if (arrayBestiaryInfo.length) {
          await this.bestiaryService.saveDataToFile(arrayBestiaryInfo, 'bestiary.json');
        }

        if (arrayBestiaryFVTT.length) {
          await this.bestiaryService.saveDataToFile(arrayBestiaryFVTT, 'bestiaryFVTT-V11.json');
        }

        return 'All data processed successfully!';
      } else {
        return { message: 'No bestiary data found' };
      }
    } catch (error) {
      console.error('Error fetching bestiary data:', error);
      throw error;
    }
  }
}
