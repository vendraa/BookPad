import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailPage.css';

function DetailPage() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    
    const [book, setBook] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [firstEdition, setFirstEdition] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const id = bookId.split('/').pop();

                const workResponse = await fetch(`https://openlibrary.org/works/${id}.json`);
                const workData = await workResponse.json();
                setBook(workData);

                if (workData.authors) {
                    const authorNames = await Promise.all(
                        workData.authors.map(async (authorRef) => {
                            const authorResponse = await fetch(`https://openlibrary.org${authorRef.author.key}.json`);
                            const authorData = await authorResponse.json();
                            return authorData.name;
                        })
                    );
                    setAuthors(authorNames);
                }

                const editionsResponse = await fetch(`https://openlibrary.org/works/${id}/editions.json?limit=50`);
                const editionsData = await editionsResponse.json();
                const sortedEditions = editionsData.entries
                    .filter(edition => edition.publish_date)
                    .sort((a, b) => new Date(a.publish_date) - new Date(b.publish_date));
                if (sortedEditions.length > 0) {
                    setFirstEdition(sortedEditions[0]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching book data:', error);
                setLoading(false); 
            }
        };

        fetchBookData();
    }, [bookId]);

    return (
        <div className="detail-page">
            <div className="book-container">
                <div className="book-cover">
                    {loading ? (
                        <div className='detail-loading-text'>Loading Details...</div>
                    ) : (
                        <img
                            src={`https://covers.openlibrary.org/b/id/${book?.covers ? book.covers[0] : ''}-L.jpg`}
                            alt="Book Cover"
                        />
                    )}
                </div>

                {!loading && (
                    <div className="book-info">
                        <div className="detail-back-button-container">
                             <button className="detail-back-button" onClick={() => navigate(-1)}>
                                ←
                            </button>
                        </div>
                        <h2>{book?.title}</h2>
                        <p><strong>Penulis:</strong> {authors.length > 0 ? authors.join(', ') : 'N/A'}</p>
                        <p><strong>Tahun Terbit:</strong> {firstEdition?.publish_date || 'Data Tidak Ditemukan'}</p>
                        <p><strong>ISBN:</strong> {firstEdition?.isbn_10 ? firstEdition.isbn_10.join(', ') : firstEdition?.isbn_13 ? firstEdition.isbn_13.join(', ') : 'Data Tidak Ditemukan'}</p>
                        <p><strong>Penerbit:</strong> {firstEdition?.publishers ? firstEdition.publishers.join(', ') : 'Data Tidak Ditemukan'}</p>
                        
                        <div className="book-description">
                            {book.description ? (book.description.value || book.description) : 'Deskripsi Buku Tidak Tersedia.'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailPage;
