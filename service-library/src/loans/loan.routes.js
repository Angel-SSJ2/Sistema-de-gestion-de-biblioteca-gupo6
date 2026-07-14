import { Router } from 'express';
import { getAllLoans, createLoan, returnLoan } from './loan.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getAllLoans);
router.post('/', validateJWT, createLoan);
router.put('/:id/return', validateJWT, returnLoan);

export default router;
