import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BestiaryController } from './bestiary/bestiary.controller';
import { BestiaryService } from './bestiary/bestiary.service';
import { BestiaryModule } from './bestiary/bestiary.module';

@Module({
  imports: [BestiaryModule],
  controllers: [AppController, BestiaryController],
  providers: [AppService, BestiaryService],
})
export class AppModule {}
