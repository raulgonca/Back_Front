import { User } from "../Users/user.entity";
import { Project } from "../Projects/project.entity";
export declare class UserProject {
    user_id: number;
    project_id: number;
    user: User;
    project: Project;
}
