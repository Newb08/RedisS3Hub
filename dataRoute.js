import express from 'express';
import {
    createUser,
    readUsers,
    updateUser,
    deleteUser,
    readUsersById,
    getUrl
// } from './DataOps.js';
} from './DataOps2.js';

const router = express.Router();

router.get('/users', readUsers);
router.get('/users/:id', readUsersById);
router.get('/users/:id/uploadImage', getUrl);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
