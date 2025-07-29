import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ default: 0 })
  status: number;
}

enum statusTypes {
  Read,
  Unread,
}
