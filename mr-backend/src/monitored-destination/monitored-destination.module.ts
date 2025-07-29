import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredDestinationService } from './monitored-destination.service';
import { MonitoredDestinationController } from './monitored-destination.controller';
import { MonitoredDestination } from './entities/monitored-destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoredDestination])],
  controllers: [MonitoredDestinationController],
  providers: [MonitoredDestinationService],
  exports: [MonitoredDestinationService],
})
export class MonitoredDestinationModule {}
