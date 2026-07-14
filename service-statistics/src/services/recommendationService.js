const libraryService = require('./libraryService');

const getRecommendationsByCategory = async (category, token) => {
  const books = await libraryService.getBooks(token);

  const categoryLower = category.toLowerCase();

  const recommendations = books
    .filter(book => {
      const bookCategory = (book.category || '').toLowerCase();
      return bookCategory === categoryLower && book.available !== false;
    })
    .map(book => ({
      _id: book._id,
      title: book.title,
      author: book.author,
      category: book.category
    }));

  return {
    category,
    count: recommendations.length,
    books: recommendations
  };
};

module.exports = { getRecommendationsByCategory };
