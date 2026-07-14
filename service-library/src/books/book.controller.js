`use strict`;

import { Book } from './book.model.js';

export const getAllBooks = async (req, res) => {
    try {
        const { title, author, category, available } = req.query;
        let query = { status: true };

        if (title) query.title = { $regex: title, $options: 'i' };
        if (author) query.author = { $regex: author, $options: 'i' };
        if (category) query.category = { $regex: category, $options: 'i' };
        if (available !== undefined) query.available = available === 'true';

        const books = await Book.find(query).select('-__v');
        res.status(200).json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener libros', error: error.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).select('-__v');
        if (!book) {
            return res.status(404).json({ success: false, message: 'Libro no encontrado' });
        }
        res.status(200).json({ success: true, book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el libro', error: error.message });
    }
};

export const createBook = async (req, res) => {
    try {
        const { title, author, category, year } = req.body;

        const book = new Book({ title, author, category, year });
        await book.save();

        res.status(201).json({ success: true, message: 'Libro creado exitosamente', book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el libro', error: error.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const { title, author, category, year, available } = req.body;
        
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, category, year, available, updatedAt: new Date() },
            { new: true, runValidators: true }
        ).select('-__v');

        if (!book) {
            return res.status(404).json({ success: false, message: 'Libro no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Libro actualizado', book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el libro', error: error.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { status: false, updatedAt: new Date() },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ success: false, message: 'Libro no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Libro eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el libro', error: error.message });
    }
};
