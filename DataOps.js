import redis from './redisClient.js';

const decreaseIndex = async () => {
    try {
        const data = await redis.json.get('Users', '$');
        data.forEach((user, ind) => {
            user.id = ind + 1;
        });
        await redis.json.set('Users', '$', data);
    } catch (error) {
        console.log('Error in changing indices', error);
    }
};

const createUser = async (req, res) => {
    try {
        const data = req.body;
        const len = await redis.json.arrLen('Users', '$');
        const result1 = await redis.json.arrAppend('Users', '$', {
            id: len[0] + 1,
            ...data,
        });
        if (result1) {
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
        const result = await redis.json.get('Users', '$');
        if (result) {
            console.log('User data retrieved');
            return res.status(200).send(result);
        } else {
            console.log("Data can't be retrieved");
            return res.status(404).send('No Data Found');
        }
    } catch (error) {
        console.log('Error while fetching users', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const readUsersById = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const result = await redis.json.get('Users', `$[2]`);
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
        const userId = parseInt(req.params.id);
        const result = await redis.json.merge(
            'Users',
            `$[${userId - 1}]`,
            data
        );
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
        const userId = parseInt(req.params.id);
        const result = await redis.json.arrPop('Users', '$', userId - 1);
        if (result) {
            console.log('User data deleted');
            decreaseIndex();
            return res
                .status(200)
                .json({ message: 'User deleted', deletedUser: result });
        } else {
            console.log("Data can't be deleted");
            return res.status(404).send('Data Not Found');
        }
    } catch (error) {
        console.log('Error while deleting user', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const uploadImage=

export { createUser, readUsers, updateUser, deleteUser, readUsersById };
