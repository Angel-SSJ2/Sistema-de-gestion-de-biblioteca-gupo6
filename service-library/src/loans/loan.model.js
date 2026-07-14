import { Schema, model } from 'mongoose';

const LoanSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'El libro es obligatorio']
    },
    userId: {
        type: String,
        required: [true, 'El usuario es obligatorio']
    },
    loanDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: [true, 'La fecha de vencimiento es obligatoria']
    },
    returnDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'returned', 'overdue'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

LoanSchema.pre('save', function() {
    if (!this.loanDate) {
        this.loanDate = new Date();
    }
});

export const Loan = model('Loan', LoanSchema);
