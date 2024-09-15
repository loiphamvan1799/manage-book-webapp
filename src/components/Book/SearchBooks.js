import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { search, getAll } from '../../BooksAPI';
import Book from './Book';

export default function SearchBooks() {
    const [text, setText] = useState('');
    const [searchBooks, setSearchBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        getAll().then(books => {
            setAllBooks(books);
        }).catch(() => {
            setAllBooks([]);
        });
    }, []);

    useEffect(() => {
        if (text === '') {
            setSearchBooks([]);
            return;
        }

        let active = true;

        search(text).then(BookSearched => {
            if (active) { 
                if (BookSearched.error) {
                    setSearchBooks([]);
                } else {
                    const updatedBooksSearched = BookSearched.map(book => {
                        const bookFoundInAll = allBooks.find(found => found.id === book.id);
                        if (bookFoundInAll) {
                            book.shelf = bookFoundInAll.shelf;
                        } else {
                            book.shelf = 'none';
                        }
                        return book;
                    });
                    setSearchBooks(updatedBooksSearched);
                }
            }
        }).catch(() => {
            if (active) {
                setSearchBooks([]); 
            }
        });

        return () => {
            active = false;
        };

    }, [text, allBooks]);

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={handleInputChange}
                        value={text} // Đảm bảo input đồng bộ với state
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchBooks && (
                        searchBooks.map(bookSearched => (
                            <Book
                                key={bookSearched.id}
                                bookIsFiltered={bookSearched}
                                books={searchBooks}
                                setBooks={setSearchBooks}
                            />
                        ))
                    )}
                </ol>
            </div>
        </div>
    );
}
