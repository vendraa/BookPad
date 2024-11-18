import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ addToCollection }) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreBooks, setHasMoreBooks] = useState(true); 
  const [bookCache, setBookCache] = useState(() => {
    const savedCache = localStorage.getItem('bookCache');
    return savedCache ? JSON.parse(savedCache) : {};
  });

  const navigate = useNavigate();

  const fetchBooks = useCallback(
    async (pageNumber) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=subject:Books&limit=50&page=${pageNumber}`
        );
        const data = await response.json();
  
        if (data.docs.length > 0) {
          const formattedBooks = data.docs.map((book) => ({
            title: book.title,
            authors: book.author_name,
            coverId: book.cover_i,
            id: book.key,
          }));
  
          setBooks(formattedBooks);
          const updatedCache = {
            ...bookCache,
            [pageNumber]: formattedBooks,
          };
          setBookCache(updatedCache);
  
          localStorage.setItem('bookCache', JSON.stringify(updatedCache));
        } else {
          setHasMoreBooks(false);
          setBooks([]);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
      setIsLoading(false);
    },
    [bookCache]
  );
  

  useEffect(() => {
    if (bookCache[page]) {
      setBooks(bookCache[page]);
      setIsLoading(false);
    } else {
      fetchBooks(page);
    }
  }, [page, bookCache, fetchBooks]);

  const handleNextPage = () => {
    if (hasMoreBooks) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setIsLoading(true);
      setPage((prevPage) => prevPage - 1);
    }
  };

  const placeholderImage = 'https://via.placeholder.com/128x192.png?text=No+Cover';

  return (
    <div className="home-page">
      <div className="home-logo-container">
        <img src="/assets/BookPad_Logo.png" alt="logo" className="home-logo" />
      </div>
      <h2 className="home-section-title">Daftar Buku</h2>

      {hasMoreBooks && books.length === 0 && !isLoading && (
        <p className="loading-text">Buku Yang Ditampilkan Belum Tersedia Lagi.</p>
      )}

      {isLoading ? (
        <p className="loading-text">
          Loading Books<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
        </p>
      ) : (
        <div className="home-book-grid">
          {books.map((book, index) => (
            <div className="home-book-card" key={index}>
              <img
                src={book.coverId ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg` : placeholderImage}
                alt={book.title}
                className="home-book-image"
              />
              <h3 className="home-book-title">{book.title}</h3>
              <p className="home-book-author">{book.authors?.join(', ')}</p>
              <button
                className="home-detail-button"
                onClick={() => navigate(`/book${book.id}`)}
              >
                Lihat Detail
              </button>
              <button
                className="home-add-to-collection"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCollection(book);
                }}
              >
                Tambahkan ke Koleksimu
              </button>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="pagination-text">Page {page}</span>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={!hasMoreBooks}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
