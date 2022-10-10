import { ProfileTypes } from '../../../shared/profile-types.enum';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ProfileTypes })
  type: ProfileTypes;

  @Column({ type: 'varchar', length: 150 })
  description: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
