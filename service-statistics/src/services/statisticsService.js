const libraryService = require('./libraryService');

const getMostLoanedBooks = async (token) => {
  const [books, loans] = await Promise.all([
    libraryService.getBooks(token),
    libraryService.getLoans(token)
  ]);

  const loanCountByBook = {};
  loans.forEach(loan => {
    const bookId = typeof loan.book === 'object' ? loan.book._id || loan.book.toString() : loan.book;
    loanCountByBook[bookId] = (loanCountByBook[bookId] || 0) + 1;
  });

  const result = books
    .map(book => ({
      _id: book._id,
      title: book.title,
      author: book.author,
      category: book.category,
      loanCount: loanCountByBook[book._id] || 0
    }))
    .filter(book => book.loanCount > 0)
    .sort((a, b) => b.loanCount - a.loanCount)
    .slice(0, 10);

  return result;
};

const getLoansByCategory = async (token) => {
  const [books, loans] = await Promise.all([
    libraryService.getBooks(token),
    libraryService.getLoans(token)
  ]);

  const bookMap = {};
  books.forEach(book => {
    bookMap[book._id] = book;
  });

  const categoryStats = {};
  loans.forEach(loan => {
    const bookId = typeof loan.book === 'object' ? loan.book._id || loan.book.toString() : loan.book;
    const book = bookMap[bookId];
    if (book) {
      const category = book.category || 'Sin categoría';
      categoryStats[category] = (categoryStats[category] || 0) + 1;
    }
  });

  return Object.entries(categoryStats)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
};

module.exports = {
  getMostLoanedBooks,
  getLoansByCategory
};
