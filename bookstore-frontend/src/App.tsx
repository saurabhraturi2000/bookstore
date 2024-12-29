import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import { Book } from './types';
import { searchBooks, getAllBooks } from './api';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setIsLoading(false);
    };

    fetchBooks();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    try {
      if (query.trim()) {
        const results = await searchBooks(query);
        setBooks(results);
      } else {
        const data = await getAllBooks();
        setBooks(data);
      }
    } catch (error) {
      console.error('Error searching books:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Bookstore</h1>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <BookList books={books} searchQuery={searchQuery} />
        )}
      </main>
    </div>
  );
}

export default App;