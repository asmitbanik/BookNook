import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, Review } from '../types';
import { api } from '../services/api';
import StarRating from '../components/ui/StarRating';
import ReviewCard from '../components/reviews/ReviewCard';
import ReviewForm from '../components/reviews/ReviewForm';
import Button from '../components/ui/Button';
import { ArrowLeft, BookOpen, Heart, Calendar, Tag } from 'lucide-react';
import { useReadingList } from '../context/ReadingListContext';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToReadingList, removeFromReadingList, isInReadingList } = useReadingList();
  
  useEffect(() => {
    const fetchBookAndReviews = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const bookData = await api.getBookById(id);
        if (bookData) {
          setBook(bookData);
          const reviewsData = await api.getReviewsByBookId(id);
          setReviews(reviewsData);
        } else {
          // Book not found
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndReviews();
  }, [id, navigate]);

  const handleReadingListToggle = () => {
    if (!book) return;
    
    if (isInReadingList(book.id)) {
      removeFromReadingList(book.id);
    } else {
      addToReadingList(book);
    }
  };

  const handleReviewAdded = async () => {
    if (!id) return;
    // Refresh reviews
    const reviewsData = await api.getReviewsByBookId(id);
    setReviews(reviewsData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 bg-gray-200 rounded-lg aspect-[2/3]"></div>
              <div className="w-full md:w-2/3">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="container mx-auto max-w-6xl text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Book not found
          </h2>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-900 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>

        {/* Book details */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Book cover */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                className="w-full object-cover aspect-[2/3]"
              />
            </div>
          </div>

          {/* Book info */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
            
            <div className="flex items-center mb-4">
              <StarRating rating={book.rating} size={24} />
              <span className="ml-2 text-lg font-medium text-gray-700">
                {book.rating.toFixed(1)}
              </span>
              <span className="ml-2 text-gray-500">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                <Tag size={16} className="mr-1" />
                <span>{book.genre}</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                <Calendar size={16} className="mr-1" />
                <span>{book.publicationYear}</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                <BookOpen size={16} className="mr-1" />
                <span>ISBN: {book.isbn}</span>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              {book.description}
            </p>
            
            <Button
              onClick={handleReadingListToggle}
              variant={isInReadingList(book.id) ? 'secondary' : 'primary'}
              className="flex items-center"
            >
              <Heart size={18} className={`mr-2 ${isInReadingList(book.id) ? 'fill-current' : ''}`} />
              {isInReadingList(book.id) ? 'Remove from Reading List' : 'Add to Reading List'}
            </Button>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            Reviews
          </h2>

          <div className="space-y-8">
            {/* Review form */}
            <ReviewForm bookId={book.id} onReviewAdded={handleReviewAdded} />
            
            {/* Reviews list */}
            <div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
              </h3>
              
              {reviews.length === 0 ? (
                <p className="text-gray-500 italic">
                  No reviews yet. Be the first to review this book!
                </p>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;