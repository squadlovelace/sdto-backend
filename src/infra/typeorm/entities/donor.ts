import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { DonorType } from '../../../shared/donor-type.enum';
import { User } from './user';
// import { Organ } from './organ';

@Entity()
export class Donor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DonorType })
  type: DonorType;

  // @ManyToMany(() => Organ, (organ) => organ.donor, {
  //   cascade: true,
  // })
  // @JoinTable()
  // organ: Organ[];

  @OneToOne(() => User, (user) => user.donor, {
    nullable: true,
  })
  @JoinColumn()
  user: User;
}
