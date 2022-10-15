import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Organ, (organ) => organ.receiver, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  organ: Organ[];

  @OneToOne(() => User, (user) => user.receiver, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
