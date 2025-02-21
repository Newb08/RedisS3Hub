import express from 'express';
import {
    createUser,
    readUsers,
    updateUser,
    deleteUser,
    readUsersById,
    getUrl
// } from './DataOps.js';
} from './UserOps.js';

const router = express.Router();

router.get('/users', readUsers);
router.get('/users/:userKey', readUsersById);
router.get('/users/:userKey/uploadImage', getUrl);
router.post('/users', createUser);
router.patch('/users/:userKey', updateUser);
router.delete('/users/:userKey', deleteUser);

export default router;
