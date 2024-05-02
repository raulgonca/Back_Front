import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../Users/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
<<<<<<< HEAD
  name: string;
=======
  nameproject: string;
>>>>>>> 1bb27441 (2/5 arreglos)

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.ownedProjects)
  owner: User;

  @ManyToMany(() => User, user => user.projects)
  @JoinTable()
  collaborators: User[];
}
