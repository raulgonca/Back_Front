<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Project } from '../Projects/project.entity';
>>>>>>> 26191f5a (15/04 update)

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

<<<<<<< HEAD
    @Column()
    password : string;
=======
    @ApiProperty({ description: 'Contraseña del usuario' })
    @Column('jsonb', { nullable: true })
    password: string;
  
    @OneToMany(() => Project, project => project.User)
    projects: Project[];
>>>>>>> 26191f5a (15/04 update)
}

