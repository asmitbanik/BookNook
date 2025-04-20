import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Book, ReadingListContextType } from '../types';

// Create the context with a default value
const ReadingListContext = createContext<ReadingListContextType | undefined>(undefined);

// Provider component
export const ReadingListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [readingList, setReadingList] = useState<Book[]>(() => {
    // Initialize from localStorage if available
    const savedList = localStorage.getItem('readingList');
    return savedList ? JSON.parse(savedList) : [];
  });

  // Add a book to the reading list
  const addToReadingList = (book: Book) => {
    setReadingList(prevList => {
      // Don't add if already in the list
      if (prevList.some(item => item.id === book.id)) {
        return prevList;
      }
      const newList = [...prevList, book];
      // Save to localStorage
      localStorage.setItem('readingList', JSON.stringify(newList));
      return newList;
    });
  };

  // Remove a book from the reading list
  const removeFromReadingList = (bookId: string) => {
    setReadingList(prevList => {
      const newList = prevList.filter(book => book.id !== bookId);
      // Save to localStorage
      localStorage.setItem('readingList', JSON.stringify(newList));
      return newList;
    });
  };

  // Check if a book is in the reading list
  const isInReadingList = (bookId: string): boolean => {
    return readingList.some(book => book.id === bookId);
  };

  return (
    <ReadingListContext.Provider value={{
      readingList,
      addToReadingList,
      removeFromReadingList,
      isInReadingList
    }}>
      {children}
    </ReadingListContext.Provider>
  );
};

// Custom hook to use the reading list context
export const useReadingList = (): ReadingListContextType => {
  const context = useContext(ReadingListContext);
  if (context === undefined) {
    throw new Error('useReadingList must be used within a ReadingListProvider');
  }
  return context;
};