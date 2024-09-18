import 'dotenv/config';

class DbConfig {
    port: string;
    key: string = "ñññññ";

    constructor() {
        this.port = process.env.PORT || '5040';
    }

    getEnvDataBase() {
        return {
            dbUri: process.env.DB_URI || 'postgresql://postgres:root@localhost:5432/formotex'
        };
    }

    getKey() {
        return this.key;
    }
}

export const dbConfig = new DbConfig();