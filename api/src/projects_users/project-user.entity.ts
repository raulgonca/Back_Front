import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
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
  user: User;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "projectId" })
  project: Project;
}