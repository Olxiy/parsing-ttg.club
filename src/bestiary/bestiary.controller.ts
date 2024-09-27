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
      const fillListBestiary = await firstValueFrom(
        this.bestiaryService.fillListBestiary(),
      );

      if (
        fillListBestiary &&
        fillListBestiary.data &&
        fillListBestiary.data.length
      ) {
        for (const item of fillListBestiary.data) {
          await delay(100);
          counter++;

          console.log('Processing:', item.url);
          console.log('Left data:', fillListBestiary.data.length - counter);

          const bestiaryData = await firstValueFrom(
            this.bestiaryService.getSelectedBestiaryInfo(item.url),
          );

          arrayBestiaryInfo.push(bestiaryData.data);

          const bestiaryFVTT = await firstValueFrom(
            this.bestiaryService.getSelectedBestiaryFVTT(
              bestiaryData?.data?.id,
              '11',
            ),
          );
          arrayBestiaryFVTT.push(bestiaryFVTT.data);
        }

        if (arrayBestiaryInfo.length) {
          this.bestiaryService.saveDataToFile(
            arrayBestiaryInfo,
            'bestiary.json',
          );
        }

        if (arrayBestiaryFVTT.length) {
          this.bestiaryService.saveDataToFile(
            arrayBestiaryInfo,
            'bestiaryFVTT-V11.json',
          );
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
