import { PartialType } from '@nestjs/swagger';
import { CreateMonitoredDestinationDto } from './create-monitored-destination.dto';

export class UpdateMonitoredDestinationDto extends PartialType(
  CreateMonitoredDestinationDto,
) {}
