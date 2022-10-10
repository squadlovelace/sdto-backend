import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class HealthCheckController {
  @Get('version')
  version() {
    return { APIVersion: '0.0.1' };
  }
}
