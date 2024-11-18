import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = ({ addToCollection }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCache, setSearchCache] = useState(() => {
    const savedCache = localStorage.getItem('searchCache');
    return savedCache ? JSON.parse(savedCache) : {};
  });
  const [recommendedCache, setRecommendedCache] = useState(() => {
    const savedCache = localStorage.getItem('recommendedCache');
    return savedCache ? JSON.parse(savedCache) : {};
  });

  const navigate = useNavigate();

  const fetchBooks = useCallback(
    async (query) => {
      setIsLoading(true);
      if (searchCache[query]) {
        setBooks(searchCache[query]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}&fields=title,author_name,cover_i,key&limit=25`
        );
        const data = await response.json();
        const formattedBooks = data.docs || [];

        const updatedCache = {
          ...searchCache,
          [query]: formattedBooks,
        };
        setSearchCache(updatedCache);
        localStorage.setItem('searchCache', JSON.stringify(updatedCache));

        setBooks(formattedBooks);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchCache]
  );

  const fetchRecommendedBooks = useCallback(async () => {
    setIsLoading(true);
    const cacheKey = 'recommended';
    if (recommendedCache[cacheKey]) {
      setRecommendedBooks(recommendedCache[cacheKey]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=subject:fiction&fields=title,author_name,cover_i,key&limit=25`
      );
      const data = await response.json();
      const formattedBooks = data.docs || [];

      const updatedCache = {
        ...recommendedCache,
        [cacheKey]: formattedBooks,
      };
      setRecommendedCache(updatedCache);
      localStorage.setItem('recommendedCache', JSON.stringify(updatedCache));

      setRecommendedBooks(formattedBooks);
    } catch (error) {
      console.error('Failed to fetch recommended books:', error);
    } finally {
      setIsLoading(false);
    }
  }, [recommendedCache]);

  useEffect(() => {
    fetchRecommendedBooks();
  }, [fetchRecommendedBooks]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchBooks(searchQuery);
    }
  };

  const handleBack = () => {
    setBooks([]);
    setSearchQuery('');
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <form onSubmit={handleSearch} className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search Books or Author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </header>

      {books.length > 0 && (
        <button className="search-back-button" onClick={handleBack}>
          ←
        </button>
      )}

      <div className="result-header">
        <h2 className="section-title">
          {books.length > 0 ? 'Hasil Pencarian' : 'Rekomendasi Untukmu'}
        </h2>
      </div>

      {isLoading ? (
        <p className="loading-text">Loading Books...</p>
      ) : (
        <div className="search-book-grid">
          {(books.length > 0 ? books : recommendedBooks).map((book, index) => (
            <div className="search-book-card" key={index}>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="search-book-img"
              />
              <h3 className="search-book-title">{book.title}</h3>
              <p className="search-book-author">{book.author_name?.join(', ')}</p>
              <button
                className="search-detail-button"
                onClick={() => navigate(`/book${book.key}`)}
              >
                Lihat Detail
              </button>
              <button
                className="search-add-to-collection"
                onClick={() =>
                  addToCollection({
                    id: book.key,
                    title: book.title,
                    authors: book.author_name,
                    coverId: book.cover_i,
                  })
                }
              >
                Tambahkan ke Koleksimu
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
