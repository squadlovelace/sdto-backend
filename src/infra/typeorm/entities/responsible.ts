import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Responsible {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  relationship: string;

  @OneToOne(() => User, (user) => user.responsible)
  user: User;
}
