import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  created_at: Date;

  @Column()
  status: statusTypes;
}

enum statusTypes{
    Read,
    Unread
}