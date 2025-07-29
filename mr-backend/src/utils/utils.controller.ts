import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { get } from 'http';

@Controller('utils')
export class UtilsController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db:TypeOrmHealthIndicator
    ){}

    @Get('/db-health-check')
    @HealthCheck()
    check()
    {
        return this.health.check([
            () => this.db.pingCheck('travel_risk'),
        ])
    };

    @Get()
    defaultEntryway(): string
    {
        return "you contacted the utils route for no reason in particular. Dingus.";
    }
}
