import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Institution } from './institution';
import { User } from './user';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  street: string;

  @Column({ type: 'varchar', length: 10 })
  number: string;

  @Column({ type: 'varchar', length: 10 })
  zipcode: string;

  @Column({ type: 'varchar', length: 64 })
  neighborhood: string;

  @Column({ type: 'varchar', length: 64 })
  city: string;

  @Column({ type: 'varchar', length: 64 })
  state: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  complement: string;

  @OneToOne(() => User, (user) => user.address, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => Institution, (institution) => institution.address, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  institution: Institution;
}
