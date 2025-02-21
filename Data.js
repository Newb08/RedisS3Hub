import redis from './redisClient.js';

export const data = [
    {
        id: 1,
        firstname: 'Aarav',
        lastname: 'Sharma',
        age: 25,
        email: 'aarav.sharma@example.com',
    },
    {
        id: 2,
        firstname: 'Neha',
        lastname: 'Patel',
        age: 28,
        email: 'neha.patel@example.com',
    },
    {
        id: 3,
        firstname: 'Rohan',
        lastname: 'Verma',
        age: 30,
        email: 'rohan.verma@example.com',
    },
    {
        id: 4,
        firstname: 'Sanya',
        lastname: 'Kapoor',
        age: 24,
        email: 'sanya.kapoor@example.com',
    },
];

await redis.json.set('Users', '$', data);
