import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Institution } from './institution';
import { User } from './user';

@Entity()
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 8 })
  crm: string;

  @Column({ type: 'varchar', length: 64 })
  position: string;

  @OneToMany(() => Institution, (institution) => institution.collaborator, {
    nullable: true,
  })
  @JoinColumn()
  institution: Institution;

  @OneToOne(() => User, (user) => user.collaborator, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
