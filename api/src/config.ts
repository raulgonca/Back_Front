import * as dotenv from "dotenv";
import * as path from "path";


dotenv.config({ path : path.resolve(__dirname, "../.develop.env") });

interface Config {
    dbType: "postgres";
    dbHost: string;
    dbPort: number;
    dbUsername: string;
    dbPassword: string;
    dbDatabase: string;
    typeormSynchronize: boolean;
    typeormEntities: string[];
    typeormMigrations: string[];
    typeormMigrationsDir: string;
    appPort: number;
    jwtSecret: string;
    jwtExpirationTime: number;
    cors: string;
}


