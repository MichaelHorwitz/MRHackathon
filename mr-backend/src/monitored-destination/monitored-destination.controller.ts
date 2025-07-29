import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MonitoredDestinationService } from './monitored-destination.service';
import { CreateMonitoredDestinationDto } from './dto/create-monitored-destination.dto';
import { UpdateMonitoredDestinationDto } from './dto/update-monitored-destination.dto';

@Controller('monitored-destination')
export class MonitoredDestinationController {
  constructor(
    private readonly monitoredDestinationService: MonitoredDestinationService,
  ) {}

  @Post()
  create(@Body() createMonitoredDestinationDto: CreateMonitoredDestinationDto) {
    return this.monitoredDestinationService.create(
      createMonitoredDestinationDto,
    );
  }

  @Get()
  findAll() {
    return this.monitoredDestinationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitoredDestinationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMonitoredDestinationDto: UpdateMonitoredDestinationDto,
  ) {
    return this.monitoredDestinationService.update(
      +id,
      updateMonitoredDestinationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.monitoredDestinationService.remove(id);
  }
}
