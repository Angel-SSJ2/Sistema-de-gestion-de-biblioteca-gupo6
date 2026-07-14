const libraryService = require('./libraryService');

const getLibrarySummary = async (token) => {
  const [books, loans] = await Promise.all([
    libraryService.getBooks(token),
    libraryService.getLoans(token)
  ]);

  const totalBooks = books.length;

  const availableBooks = books.filter(book => book.available !== false).length;

  const loanedBooks = totalBooks - availableBooks;

  const categories = [...new Set(books.map(book => book.category).filter(Boolean))];

  const loanCountByBook = {};
  loans.forEach(loan => {
    const bookId = typeof loan.book === 'object' ? loan.book._id || loan.book.toString() : loan.book;
    loanCountByBook[bookId] = (loanCountByBook[bookId] || 0) + 1;
  });

  let mostLoanedBook = null;
  let maxLoans = 0;

  books.forEach(book => {
    const count = loanCountByBook[book._id] || 0;
    if (count > maxLoans) {
      maxLoans = count;
      mostLoanedBook = {
        _id: book._id,
        title: book.title,
        author: book.author,
        loanCount: count
      };
    }
  });

  return {
    totalBooks,
    availableBooks,
    loanedBooks,
    categories,
    mostLoanedBook
  };
};

module.exports = { getLibrarySummary };
