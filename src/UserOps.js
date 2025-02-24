import redis from './redisClient.js';
import { putObjectURL, deleteObjectURL } from './index.js';
import { v4 as uuidv4 } from 'uuid';

const createUser = async (req, res) => {
    try {
        const data = req.body;
        const img = `https://mehul-private-bucket.s3.ap-south-1.amazonaws.com/uploads/profile+Pic.webp`;
        const userKey = uuidv4().replaceAll('-', '');
        const result = await redis.json.set('Users', `$.${userKey}`, {
            id: userKey,
            ...data,
            imageUrl: img
        });

        console.log(`User added with key: ${userKey}`);
        if (result) {
            console.log('User data added');
            return res.status(201).send(`User Added`);
        } else {
            console.log("Data can't be added");
            return res.status(404).send("User can't be added");
        }
    } catch (error) {
        console.log('Error while creating user', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const readUsers = async (req, res) => {
    try {
        const result = await redis.json.get('Users', { path: `$.*` });

        if (result && Object.keys(result).length > 0) {
            console.log('User data retrieved');
            return res.status(200).json(result);
        } else {
            console.log('No user data found');
            return res.status(200).send('No users created');
        }
    } catch (error) {
        console.log('Error while fetching users', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const readUsersById = async (req, res) => {
    try {
        const { userKey } = req.params;
        const result = await redis.json.get('Users', { path: `.${userKey}` });
        console.log(result);
        if (result) {
            console.log('User data retrieved');
            return res.status(200).send(result);
        } else {
            console.log("Data can't be retrieved");
            return res.status(404).send('No Data Found');
        }
    } catch (error) {
        console.log('Error while reading user', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const data = req.body;
        const { userKey } = req.params;
        const result = await redis.json.merge('Users', `$.${userKey}`, data);
        if (result) {
            console.log('User data updated');
            return res.status(201).send('User updated');
        } else {
            console.log("Data can't be updated");
            return res.status(404).send('Data Not Found');
        }
    } catch (error) {
        console.log('Error while updating user', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userKey } = req.params;
        const res1 = await deleteObjectURL(userKey)
        const result = await redis.json.del('Users', `$.${userKey}`);
        if (result) {
            console.log('User data deleted');
            return res
                .status(200)
                .json({ message: 'User deleted' });
        } else {
            console.log('Data not found');
            return res.status(404).send('Data Not Found');
        }
    } catch (error) {
        console.log('Error while deleting user', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUrl = async (req, res) => {
    try {
        const { userKey } = req.params;
        const url = await putObjectURL(`${userKey}.jpg`, 'image/jpg');
        const img = url.split('.jpg')[0] + '.jpg';
        const result = await redis.json.merge('Users', `$.${userKey}`, {
            imageUrl: img,
        });

        if (result) {
            console.log('User data updated');
            return res
                .status(201)
                .send({ message: 'Url for uploading image', Url: url });
        } else {
            console.log("Data can't be updated");
            return res.status(404).send({ error: 'Data Not Found' });
        }
    } catch (error) {
        console.error('Error in getUrl:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { createUser, readUsers, updateUser, deleteUser, readUsersById, getUrl };
