import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { api } from '../services/api';
import BookGrid from '../components/books/BookGrid';
import Button from '../components/ui/Button';
import { Filter, Search } from 'lucide-react';
import OnboardingQuestionnaire from '../components/OnboardingQuestionnaire';
import { useUser } from '../context/UserContext';

const genres = ["All", "Classic", "Fantasy", "Science Fiction", "Romance", "Fiction", "Dystopian"];

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const { userInfo } = useUser();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await api.getBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Apply filters whenever filter criteria change
    let result = [...books];

    // Filter by search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(lowercasedSearch) ||
          book.author.toLowerCase().includes(lowercasedSearch)
      );
    }

    // Filter by genre
    if (selectedGenre !== 'All') {
      result = result.filter(book => book.genre === selectedGenre);
    }

    // Filter by minimum rating
    if (minRating > 0) {
      result = result.filter(book => book.rating >= minRating);
    }

    setFilteredBooks(result);
  }, [books, searchTerm, selectedGenre, minRating]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setMinRating(0);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-400 via-pink-500 to-red-400 animate-gradient-xy">
      {showOnboarding && <OnboardingQuestionnaire onComplete={handleOnboardingComplete} />}
      {/* Hero Section */}
      <div 
        className="relative text-white py-28 px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)'
        }}
      >
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-widest drop-shadow-xl animate-fadeInUp">
            {userInfo && userInfo.name ? `Welcome back, ${userInfo.name}!` : 'Discover Your Next Favorite Book'}
          </h1>
          <p className="text-3xl md:text-4xl mb-12 text-pink-200 font-semibold animate-fadeInUp delay-300">
            Browse, review, and build your personal reading list
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-5 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-pink-500 pl-16 shadow-2xl transition duration-500 ease-in-out transform focus:scale-110"
            />
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-pink-500" size={28} />
          </div>
        </div>
        {/* Animated overlay circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400 rounded-full opacity-30 animate-pulse mix-blend-multiply filter blur-xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full opacity-40 animate-pulse mix-blend-multiply filter blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-bold text-gray-800">
              Browse Books
            </h2>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value={0}>Any</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    fullWidth
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Book Grid */}
        <BookGrid books={filteredBooks} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
