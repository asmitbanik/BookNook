import React from 'react';
import { Book } from '../../types';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  loading?: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({ books, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-xl shadow-lg animate-pulse">
            <div className="aspect-[2/3] rounded-t-xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-pink-400 rounded w-3/4"></div>
              <div className="h-4 bg-purple-400 rounded w-1/2"></div>
              <div className="h-3 bg-indigo-400 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-pink-600 text-lg font-semibold">No books found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500 ease-in-out">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;