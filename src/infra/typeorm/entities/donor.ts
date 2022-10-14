import { OrganTypes } from '../../../shared/organ-types.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';

import { Organ } from './organ';
import { Institution } from './institution';

@Entity()
export class Donor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  blood_type: string;

  @Column({ type: 'enum', enum: OrganTypes })
  organType: OrganTypes;

  @Column({ type: 'varchar', length: 200 })
  cause_death: string;

  @OneToMany(() => Organ, (organ) => organ.donor, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  organ: Organ;

  @ManyToOne(() => Institution, (institution) => institution.donor, {
    nullable: true,
  })
  @JoinColumn()
  institution: Institution;
  

}

//doador e instituicao N:1
//orgao e doador N:1