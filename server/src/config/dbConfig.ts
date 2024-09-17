import 'dotenv/config';

class DbConfig {
    port: string;

    constructor() {
        this.port = process.env.PORT || '5040';
    }

    getEnvDataBase() {
        return {
            dbUri: process.env.DB_URI || 'postgresql://postgres:root@localhost:5432/formotex'
        };
    }
}

export const dbConfig = new DbConfig();