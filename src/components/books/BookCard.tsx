import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';
import { Book } from '../../types';
import StarRating from '../ui/StarRating';
import { useReadingList } from '../../context/ReadingListContext';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToReadingList, removeFromReadingList, isInReadingList } = useReadingList();
  const inReadingList = isInReadingList(book.id);

  const handleReadingListToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to book detail
    e.stopPropagation();
    
    if (inReadingList) {
      removeFromReadingList(book.id);
    } else {
      addToReadingList(book);
    }
  };

  return (
    <Link 
      to={`/books/${book.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <div className="text-white">
            <p className="font-medium">{book.author}</p>
            <p className="text-sm">{book.publicationYear}</p>
          </div>
        </div>
        <button
          onClick={handleReadingListToggle}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            inReadingList 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
          aria-label={inReadingList ? "Remove from reading list" : "Add to reading list"}
        >
          <Heart size={20} className={inReadingList ? 'fill-white' : ''} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{book.title}</h3>
        </div>
        <div className="flex items-center space-x-1 mt-1">
          <StarRating rating={book.rating} size={16} />
          <span className="text-sm text-gray-600 ml-1">{book.rating.toFixed(1)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {book.genre}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <BookOpen size={16} className="mr-1" />
            <span>{book.publicationYear}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;