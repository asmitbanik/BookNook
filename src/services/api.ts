import { Book, Review } from '../types';
import { books } from '../data/booksData';
import { reviews } from '../data/reviewsData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Books
  async getBooks(): Promise<Book[]> {
    await delay(500);
    return [...books];
  },
  
  async getBookById(id: string): Promise<Book | undefined> {
    await delay(300);
    return books.find(book => book.id === id);
  },
  
  async getBooksByGenre(genre: string): Promise<Book[]> {
    await delay(400);
    return books.filter(book => book.genre === genre);
  },
  
  async getBooksByRating(minRating: number): Promise<Book[]> {
    await delay(400);
    return books.filter(book => book.rating >= minRating);
  },
  
  // Reviews
  async getReviews(): Promise<Review[]> {
    await delay(500);
    return [...reviews];
  },
  
  async getReviewsByBookId(bookId: string): Promise<Review[]> {
    await delay(300);
    return reviews.filter(review => review.bookId === bookId);
  },
  
  async addReview(review: Omit<Review, 'id' | 'date'>): Promise<Review> {
    await delay(600);
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split('T')[0]
    };
    
    // In a real app, we would add this to the database
    // For our mock, we're just returning the new review
    return newReview;
  }
};