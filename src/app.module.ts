import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanController } from './loan/loan.controller';

@Module({
  imports: [],
  controllers: [AppController, LoanController],
  providers: [AppService],
})
export class AppModule {}
