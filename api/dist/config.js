"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.develop.env") });
const config = {
    dbType: "postgres",
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT, 10),
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
    typeormSynchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    typeormEntities: process.env.TYPEORM_ENTITIES.split(","),
    appPort: parseInt(process.env.APP_PORT, 10),
    cors: process.env.CORS,
};
exports.default = config;
//# sourceMappingURL=config.js.map