import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ScheduleService } from '../service/schedule.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  // Todo: 30초마다 balance를 체크하는 스케쥴을 완성하여 주세요.
  @Cron('*/30 * * * * *')
  async balanceMonitoring() {
    console.log('[CRON] Running balanceMonitoring');
    await this.scheduleService.getBalance();
  }

  // (나) 내가 추가한 부분 
  @Get('balance')
  async triggerBalanceMonitoring() {
    return await this.scheduleService.getBalance();
  }

  // Todo: 10초마다 1ETH를 10번 전송하는 스케쥴을 완성하여 주세요.
  @Cron('*/10 * * * * *')
  async tenTimesOneEthTransfer() {
    console.log('[CRON] Running tenTimesOneEthTransfer');
    await this.scheduleService.tenTimesOneEthTransfer();
  }

  // Todo: 30초마다 30ETH를 전송하는 스케쥴을 완성하여 주세요.
  @Cron('*/30 * * * * *')
  async thirtyEthTransfer() {
    console.log('[CRON] thirtyEthTransfer');
    await this.scheduleService.thirtyEthTransfer();
  }
}
