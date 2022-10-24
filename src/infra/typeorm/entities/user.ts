import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { BloodTypes } from '../../../shared/blood-types.enum';
import { Profile } from './profile';
import { Responsible } from './responsible';
import { Address } from './address';
import { Receiver } from './receiver';
import { Collaborator } from './collaborator';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';
import { Donor } from './donor';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 250, unique: true })
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

  @ManyToOne(() => Profile, (profile) => profile.user, {
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
    cascade: true,
  })
  receiver: Receiver;

  @OneToOne(() => Donor, (donor) => donor.user, {
    nullable: true,
    cascade: true,
  })
  donor: Donor;

  @OneToOne(() => Collaborator, (collaborator) => collaborator.user, {
    nullable: true,
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

  @BeforeInsert()
  private setPassword(password: string) {
    const salt = genSaltSync();
    this.password = hashSync(password || this.password, salt);
  }

  public static checkPassword(
    plainPassword: string,
    hashedPassword: string,
  ): boolean {
    return compareSync(plainPassword, hashedPassword);
  }
}
