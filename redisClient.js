import { createClient } from 'redis';
// import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();
const PASSWORD = process.env.RedisPass;
const HOST = process.env.HOST;
const PORT = Number(process.env.RPORT);

const redis = new createClient({
    username: 'default',
    password: PASSWORD,
    socket: {
        host: HOST,
        port: PORT,
    },
});

redis.on('connect', () => console.log('Connected to redis'));
redis.on('error', (err) => console.log('Redis Client Error', err));

await redis.connect();

export default redis;
