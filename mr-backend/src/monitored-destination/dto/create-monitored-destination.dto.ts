import { RiskLevel } from '../entities/monitored-destination.entity';

export class CreateMonitoredDestinationDto {
  location: string;
  riskLevel: RiskLevel;
  lastChecked: Date;
}
