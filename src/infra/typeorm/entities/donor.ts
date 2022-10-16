import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { DonorType } from '@shared/donor-type.enum';

@Entity()
export class Donor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DonorType })
  type: DonorType;
}
