import * as process from 'node:process';

export default () => ({
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USERNAME ?? '',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_NAME ?? '',
    },
});
