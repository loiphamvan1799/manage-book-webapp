import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { search, getAll } from '../../BooksAPI'
import Book from './Book'

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
        if (text.length > 0) {
            search(text).then(BookSearched => {
                if (BookSearched.error) {
                    setSearchBooks([]);
                } else {
                    const updatedBookisSearched = BookSearched.map(book => {
                        const bookFoundInAll = allBooks.find(found => found.id === book.id);
                        if (bookFoundInAll) {
                            book.shelf = bookFoundInAll.shelf;
                        } else {
                            book.shelf = 'none';
                        }
                        return book;
                    });
                    setSearchBooks(updatedBookisSearched);
                }
            }).catch(() => {
                setSearchBooks([]);
            });
        } else {
            setSearchBooks([]);
        }
    }, [text]);

    const handleSearch = (e) => {
        setText(e.target.value);
    }

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
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {searchBooks && searchBooks.map(bookSearched => (
                    <Book
                        key = {bookSearched.id}
                        bookIsFiltered = {bookSearched}
                        books = {searchBooks}
                        setBooks = {setSearchBooks}
                    />
                ))}
            </ol>
          </div>
        </div>
    )
}