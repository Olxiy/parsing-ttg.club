import { BestiaryService } from './bestiary.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  exports: [HttpModule],
  providers: [BestiaryService],
})
export class BestiaryModule {}
