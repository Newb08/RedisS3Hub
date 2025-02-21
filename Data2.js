import redis from './redisClient.js';

export const data = {
    user1: {
        id: 1,
        firstname: 'Aarav',
        lastname: 'Sharma',
        age: 25,
        email: 'aarav.sharma@example.com',
    },
    user2: {
        id: 2,
        firstname: 'Neha',
        lastname: 'Patel',
        age: 28,
        email: 'neha.patel@example.com',
    },
    user3: {
        id: 3,
        firstname: 'Rohan',
        lastname: 'Verma',
        age: 30,
        email: 'rohan.verma@example.com',
    },
    user4: {
        id: 4,
        firstname: 'Sanya',
        lastname: 'Kapoor',
        age: 24,
        email: 'sanya.kapoor@example.com',
    },
};

await redis.json.set('Users', '$', data);
