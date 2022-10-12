import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address';
import { Collaborator } from './collaborator';

@Entity()
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  companyName: string;

  @Column({ nullable: false, type: 'varchar', length: 14 })
  cnpj: string;

  @OneToMany(() => Collaborator, (collaborator) => collaborator.institution, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  collaborator: Collaborator;

  @OneToOne(() => Address, (address) => address.institution, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  address: Address;
}
