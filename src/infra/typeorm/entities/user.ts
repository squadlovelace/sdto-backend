import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BloodTypes } from '../../../shared/blood-types.enum';
import { Profile } from './profile';
import { Responsible } from './responsible';
import { Address } from './address';
import { Receiver } from './receiver';
import { Collaborator } from './collaborator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 250 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 128 })
  password: string;

  @Column({ nullable: false, type: 'varchar', length: 128, unique: true })
  rg: string;

  @Column({ nullable: false, type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ nullable: false, type: 'varchar', length: 14 })
  phone: string;

  @Column({ nullable: false, type: 'date' })
  birthDate: Date;

  @Column({ nullable: false, type: 'varchar', length: 64 })
  gender: string;

  @Column({ nullable: false, type: 'enum', enum: BloodTypes })
  bloodType: BloodTypes;

  @OneToOne(() => Profile, (profile) => profile.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => Address, (address) => address.user, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  address: Address;

  @OneToOne(() => Receiver, (receiver) => receiver.user, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  receiver: Receiver;

  @OneToOne(() => Collaborator, (collaborator) => collaborator.user, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  collaborator: Collaborator;

  @OneToOne(() => Responsible, (responsible) => responsible.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  responsible: Responsible;
}
