export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  rating: number;
  description: string;
  publicationYear: number;
  isbn: string;
}

export interface Review {
  id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ReadingListContextType {
  readingList: Book[];
  addToReadingList: (book: Book) => void;
  removeFromReadingList: (bookId: string) => void;
  isInReadingList: (bookId: string) => boolean;
}