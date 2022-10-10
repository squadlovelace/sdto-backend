import { OrganTypes } from '../../../shared/organ-types.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 15 })
  ischemiaTime: string;

  @Column({ type: 'enum', enum: OrganTypes })
  organType: OrganTypes;
}
