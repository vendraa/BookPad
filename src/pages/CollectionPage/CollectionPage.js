import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CollectionPage.css';

const placeholderImage = 'https://via.placeholder.com/150?text=No+Image';

const CollectionPage = ({ collection = [], onRemove }) => {
  const navigate = useNavigate();

  return (
    <div className={`collection-page ${collection.length === 0 ? 'no-books' : ''}`}>
      <header className="collection-header">
        <h1>Koleksi Kamu</h1>
      </header>
      <div className="collection-book-grid">
        {collection.length > 0 ? (
          collection.map((book) => (
            <div key={book.id} className="collection-book-card">
              <img
                src={
                  book.coverId
                    ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
                    : placeholderImage
                }
                alt={book.title || 'No title available'}
                className="collection-book-image"
              />
              <h2 className="collection-book-title">{book.title || 'Untitled'}</h2>
              <p className="collection-book-author">
                {book.authors ? book.authors.join(', ') : 'Author Unknown'}
              </p>
              <button
                className="collection-detail-button"
                onClick={() => navigate(`/book${book.id}`)}
              >
                Lihat Detail
              </button>
              <button
                className="collection-remove-button"
                onClick={() => onRemove(book.id)}
              >
                 Hapus Dari Koleksi
              </button>
            </div>
          ))
        ) : (
          <p className="no-books-message">Tambah Koleksi Buku Kamu Dulu Yukk.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
