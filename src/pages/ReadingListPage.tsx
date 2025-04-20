import React from 'react';
import { useReadingList } from '../context/ReadingListContext';
import BookGrid from '../components/books/BookGrid';
import Button from '../components/ui/Button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReadingListPage: React.FC = () => {
  const { readingList } = useReadingList();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            My Reading List
          </h1>
          <Link to="/">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {readingList.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Your reading list is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add books you want to read by clicking the heart icon on any book
            </p>
            <Link to="/">
              <Button>
                Browse Books
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-6">
              You have {readingList.length} {readingList.length === 1 ? 'book' : 'books'} in your reading list
            </p>
            <BookGrid books={readingList} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingListPage;