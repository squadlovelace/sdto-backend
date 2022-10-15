import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@ApiTags('Health Check')
@Controller('api/health')
export class HealthCheckController {
  constructor(private health: HealthCheckService) {}

  @ApiOperation({ summary: 'Verifica o status da API' })
  @ApiResponse({ status: 200 })
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}
