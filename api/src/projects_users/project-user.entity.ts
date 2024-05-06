import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, JoinTable, ManyToMany } from "typeorm";
import { User } from "../Users/user.entity";
import { Project } from "../Projects/project.entity";

@Entity()
export class UserProject {
  @PrimaryGeneratedColumn()
  user_id: number;

  @PrimaryGeneratedColumn()
  project_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  username: User;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "projectId" })
  project: Project;

  @Column('jsonb', { nullable : true })
  nameproject : string;

  @Column('jsonb', { nullable : true } )
  description : string;

  @ManyToOne(() => User, user => user.ownedProjects)
  owner : User;

  @ManyToMany(() => User, user => user.projects)
  @JoinTable()
  collaborators : User[];
}