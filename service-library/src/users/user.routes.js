import { Router } from 'express';
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} from './user.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getAllUsers);
router.get('/:id', validateJWT, getUserById);
router.post('/', validateJWT, createUser);
router.put('/:id', validateJWT, updateUser);
router.delete('/:id', validateJWT, deleteUser);

export default router;
