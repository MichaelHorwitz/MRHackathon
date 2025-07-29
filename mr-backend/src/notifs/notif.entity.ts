import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusType {
  Read = 'Read',
  Unread = 'Unread',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  created_at: Date;

  @Column({ type: 'enum', enum: StatusType,  default: StatusType.Unread  })
  status: StatusType;
}

enum statusTypes {
  Read,
  Unread,
}
