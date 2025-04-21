import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReadingListProvider } from './context/ReadingListContext';
import { UserProvider } from './context/UserContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BookDetailPage from './pages/BookDetailPage';
import ReadingListPage from './pages/ReadingListPage';

// Add custom styles to the page
import './index.css';

function App() {
  return (
    <UserProvider>
      <ReadingListProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books/:id" element={<BookDetailPage />} />
                <Route path="/reading-list" element={<ReadingListPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ReadingListProvider>
    </UserProvider>
  );
}

export default App;
