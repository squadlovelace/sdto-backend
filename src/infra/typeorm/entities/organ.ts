import { OrganTypes } from '../../../shared/organ-types.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Receiver } from './receiver';

@Entity()
export class Organ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 15 })
  ischemiaTime: string;

  @Column({ type: 'enum', enum: OrganTypes })
  organType: OrganTypes;

  @OneToMany(() => Receiver, (receiver) => receiver.organ)
  receiver: Receiver[];
}
