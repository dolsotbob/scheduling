// 애플리케이션 전체에서 사용할 모듈, 서비스, 컨트롤러들을 등록하고 연결하는 중심 파일
import { Module } from '@nestjs/common';  // 데코레이터 
import { ConfigModule } from '@nestjs/config';  // .env 파일을 불러와 환경 변수를 사용하게 해주는 모듈 

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthersService } from './modules/ethers/ethers.service';
import { ScheduleModule } from './modules/schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, EthersService],
  exports: [EthersService],
})
export class AppModule { }
