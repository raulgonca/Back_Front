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
    appPort: number;
    cors: string;
}

const config : Config = {
    dbType:"postgres",
    dbHost : process.env.DB_HOST,
    dbPort : parseInt( process.env.DB_PORT, 10 ),
    dbUsername : process.env.DB_USERNAME,
    dbPassword : process.env.DB_PASSWORD,
    dbDatabase : process.env.DB_DATABASE,
    typeormSynchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    typeormEntities: process.env.TYPEORM_ENTITIES.split(","),
    appPort : parseInt(process.env.APP_PORT,10),    
    cors : process.env.CORS,
};

export default config;

