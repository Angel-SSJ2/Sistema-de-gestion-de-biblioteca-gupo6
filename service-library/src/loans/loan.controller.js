`use strict`;

import { Loan } from './loan.model.js';
import { Book } from '../books/book.model.js';

export const createLoan = async (req, res) => {
    try {
        const { bookId, userId, dueDate } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Libro no encontrado' });
        }

        if (!book.available) {
            return res.status(400).json({ success: false, message: 'El libro no está disponible para préstamo' });
        }

        const loan = new Loan({ bookId, userId, dueDate });
        await loan.save();

        await Book.findByIdAndUpdate(bookId, { available: false });

        res.status(201).json({ success: true, message: 'Préstamo registrado exitosamente', loan });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar el préstamo', error: error.message });
    }
};

export const returnLoan = async (req, res) => {
    try {
        const { loanId } = req.body;

        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({ success: false, message: 'Préstamo no encontrado' });
        }

        if (loan.status === 'returned') {
            return res.status(400).json({ success: false, message: 'Este préstamo ya fue devuelto' });
        }

        loan.returnDate = new Date();
        loan.status = 'returned';
        await loan.save();

        await Book.findByIdAndUpdate(loan.bookId, { available: true });

        res.status(200).json({ success: true, message: 'Devolución registrada exitosamente', loan });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar la devolución', error: error.message });
    }
};

export const getLoansByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const loans = await Loan.find({ userId }).populate('bookId', 'title author category').select('-__v');
        res.status(200).json({ success: true, loans });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los préstamos', error: error.message });
    }
};

export const getAllLoans = async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};

        if (status) query.status = status;

        const loans = await Loan.find(query).populate('bookId', 'title author category').select('-__v');
        res.status(200).json({ success: true, loans });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los préstamos', error: error.message });
    }
};
