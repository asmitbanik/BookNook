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
      className="group bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl">
        <img 
          src={book.coverImage} 
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
          <div className="text-white">
            <p className="font-semibold text-lg">{book.author}</p>
            <p className="text-sm">{book.publicationYear}</p>
          </div>
        </div>
        <button
          onClick={handleReadingListToggle}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            inReadingList 
              ? 'bg-pink-600 text-white shadow-lg scale-110' 
              : 'bg-white/90 text-pink-600 hover:bg-pink-100 hover:scale-110'
          }`}
          aria-label={inReadingList ? "Remove from reading list" : "Add to reading list"}
        >
          <Heart size={22} className={inReadingList ? 'fill-white' : ''} />
        </button>
      </div>
      <div className="p-5 bg-white">
        <div className="flex justify-between items-start">
          <h3 className="font-extrabold text-lg text-gray-900 line-clamp-1 tracking-wide">{book.title}</h3>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <StarRating rating={book.rating} size={18} />
          <span className="text-sm text-pink-600 font-semibold">{book.rating.toFixed(1)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-block bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow-md">
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