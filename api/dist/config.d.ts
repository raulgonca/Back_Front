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
declare const config: Config;
export default config;
