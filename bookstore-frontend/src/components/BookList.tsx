import React from 'react';
import { Book } from '../types';

interface BookListProps {
  books: Book[];
  searchQuery: string;
}

const BookList: React.FC<BookListProps> = ({ books, searchQuery }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">By {book.author}</p>
            <div className="mb-4">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {book.category}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{book.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">${book.price.toFixed(2)}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
      {books.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery
              ? `No books found matching "${searchQuery}"`
              : 'No books available'}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookList;