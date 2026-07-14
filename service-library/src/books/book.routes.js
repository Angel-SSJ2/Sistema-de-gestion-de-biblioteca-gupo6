import { Router } from 'express';
import { 
    getAllBooks, 
    getBookById, 
    createBook, 
    updateBook, 
    deleteBook 
} from './book.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getAllBooks);
router.get('/:id', validateJWT, getBookById);
router.post('/', validateJWT, createBook);
router.put('/:id', validateJWT, updateBook);
router.delete('/:id', validateJWT, deleteBook);

export default router;
