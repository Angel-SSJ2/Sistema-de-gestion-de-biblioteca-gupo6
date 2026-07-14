import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'El autor es obligatorio'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'El año es obligatorio'],
        min: 1000,
        max: new Date().getFullYear() + 1
    },
    available: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

BookSchema.pre('save', function() {
    this.updatedAt = new Date();
});

BookSchema.pre('findOneAndUpdate', function() {
    this.set({ updatedAt: new Date() });
});

export const Book = model('Book', BookSchema);
