// NestJS에서 기본 HTTP 요청을 처리하는 컨트롤러
// 브라우저에서 http://localhost:3000/으로 접속하면, 여기 @Get() 핸들러가 실행돼서 응답을 돌려주는 역할을 한다. 
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
