import { Module } from '@nestjs/common';

import { SharedService } from './services/shared.service';

@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
