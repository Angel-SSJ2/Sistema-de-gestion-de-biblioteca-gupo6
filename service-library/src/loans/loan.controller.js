import { Loan } from './loan.model.js';

export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('book').populate('user');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener préstamos', error: error.message });
  }
};

export const createLoan = async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear préstamo', error: error.message });
  }
};

export const returnLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { returnDate: new Date(), status: 'devuelto' },
      { new: true }
    );
    if (!loan) return res.status(404).json({ message: 'Préstamo no encontrado' });
    res.json(loan);
  } catch (error) {
    res.status(400).json({ message: 'Error al devolver préstamo', error: error.message });
  }
};
