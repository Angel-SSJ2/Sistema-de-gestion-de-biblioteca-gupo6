import { Router } from 'express';
import { 
    createLoan, 
    returnLoan, 
    getLoansByUser, 
    getAllLoans 
} from './loan.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.post('/', validateJWT, createLoan);
router.post('/returns', validateJWT, returnLoan);
router.get('/user/:userId', validateJWT, getLoansByUser);
router.get('/', validateJWT, getAllLoans);

export default router;
