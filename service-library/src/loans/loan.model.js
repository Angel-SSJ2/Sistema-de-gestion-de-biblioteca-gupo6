import { Schema, model } from 'mongoose';

const LoanSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  loanDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { type: String, enum: ['activo', 'devuelto', 'vencido'], default: 'activo' }
}, { timestamps: true });

export const Loan = model('Loan', LoanSchema);
