import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganTypes } from '../../../shared/organ-types.enum';
import { Receiver } from './receiver';
import { Donor } from './donor';

@Entity()
export class Organ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 15 })
  ischemiaTime: string;

  @Column({ type: 'enum', enum: OrganTypes })
  organType: OrganTypes;

  @ManyToMany(() => Receiver, (receiver) => receiver.organ)
  receiver: Receiver;

  @ManyToMany(() => Donor, (donor) => donor.organ)
  donor: Donor;
}
