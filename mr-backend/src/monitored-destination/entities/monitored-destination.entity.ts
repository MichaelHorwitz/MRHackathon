import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RiskLevel {
  NORMAL = 'normal',
  MILD_RISK = 'mild_risk',
  HIGH_RISK = 'high_risk',
  DO_NOT_TRAVEL = 'do_not_travel',
}

@Entity()
export class MonitoredDestination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: RiskLevel,
    default: RiskLevel.NORMAL,
  })
  riskLevel: RiskLevel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastChecked: Date;
}
