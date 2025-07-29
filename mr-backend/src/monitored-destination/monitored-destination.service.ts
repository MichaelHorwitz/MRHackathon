import { Injectable } from '@nestjs/common';
import { CreateMonitoredDestinationDto } from './dto/create-monitored-destination.dto';
import { UpdateMonitoredDestinationDto } from './dto/update-monitored-destination.dto';
import { Repository } from 'typeorm';
import { MonitoredDestination } from './entities/monitored-destination.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MonitoredDestinationService {
  constructor(
    @InjectRepository(MonitoredDestination)
    private readonly repo: Repository<MonitoredDestination>,
  ) {}
  create(createMonitoredDestinationDto: CreateMonitoredDestinationDto) {
    return this.repo.save(createMonitoredDestinationDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(
    id: number,
    updateMonitoredDestinationDto: UpdateMonitoredDestinationDto,
  ) {
    return this.repo.save({ ...updateMonitoredDestinationDto, id });
  }

  async remove(id: number) {
    await this.repo.delete(id);
  }
}
