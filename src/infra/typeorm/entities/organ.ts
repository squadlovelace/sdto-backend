import { OrganTypes } from '../../../shared/organ-types.enum';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Receiver } from './receiver';
import { Donor } from './donor';

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

  @ManyToOne(() => Donor, (donor) => donor.organ)
  donor: Donor[];
}
