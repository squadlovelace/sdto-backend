import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { DonorType } from '@shared/donor-type.enum';
import { User } from './user';
import { Organ } from './organ';

@Entity()
export class Donor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DonorType })
  type: DonorType;

  @ManyToMany(() => Organ, (organ) => organ.receiver, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  organ: Organ[];

  @OneToOne(() => User, (user) => user.receiver, {
    nullable: true,
  })
  user: User;
}
