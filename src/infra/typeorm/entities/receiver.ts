import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Organ } from './organ';
import { User } from './user';

@Entity()
export class Receiver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 128, unique: true })
  rgct: string;

  @Column({ nullable: true, type: 'varchar', length: 128 })
  comorbidity: string;

  @ManyToOne(() => Organ, (organ) => organ.receiver, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  organ: Organ;

  @OneToOne(() => User, (user) => user.receiver, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
