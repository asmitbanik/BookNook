import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { api } from '../services/api';
import BookGrid from '../components/books/BookGrid';
import Button from '../components/ui/Button';
import { Filter, Search } from 'lucide-react';
import OnboardingQuestionnaire from '../components/OnboardingQuestionnaire';
import { useUser } from '../context/UserContext';

const genres = ["All", "Classic", "Fantasy", "Science Fiction", "Romance", "Fiction", "Dystopian"];

const FloatingShape: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    style={style}
    className="absolute rounded-full opacity-70 animate-floating"
  />
);

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
        className="relative text-white py-32 px-6 overflow-hidden rounded-b-3xl shadow-2xl max-w-7xl mx-auto"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 opacity-80 rounded-b-3xl animate-gradient-xy"></div>
        {/* Floating shapes */}
        <FloatingShape style={{ width: 80, height: 80, backgroundColor: '#ff6f91', top: 40, left: 30, animationDuration: '6s' }} />
        <FloatingShape style={{ width: 100, height: 100, backgroundColor: '#ff9671', top: 120, right: 50, animationDuration: '8s' }} />
        <FloatingShape style={{ width: 60, height: 60, backgroundColor: '#ffc75f', bottom: 60, left: 100, animationDuration: '7s' }} />
        <FloatingShape style={{ width: 90, height: 90, backgroundColor: '#845ec2', bottom: 40, right: 120, animationDuration: '9s' }} />
        <div className="relative container mx-auto max-w-4xl text-center z-10 flex flex-col items-center justify-center min-h-[300px]">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide leading-tight animate-fadeInUp text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400 animate-text-glow">
            {userInfo && userInfo.name ? `Welcome back, ${userInfo.name}!` : 'Find Your Next Great Read'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-semibold animate-fadeInUp delay-300 max-w-lg text-yellow-200 drop-shadow-lg">
            Discover, review, and curate your personalized reading list with ease.
          </p>
          <Button
            variant="pink"
            className="mb-8 px-10 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 animate-glow"
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
          >
            Start Exploring
          </Button>
          {/* Search Bar */}
          <div className="max-w-xl w-full relative animate-fadeInUp delay-700">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-5 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-pink-500 pl-16 shadow-lg transition duration-500 ease-in-out transform focus:scale-105 focus:animate-glow"
            />
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-pink-500" size={28} />
          </div>
        </div>
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
            <div className="bg-white p-6 rounded-xl shadow-lg mb-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-500"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-500"
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
