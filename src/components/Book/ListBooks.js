import { useState, useEffect } from "react"
import { getAll } from '../../BooksAPI'
import Book from './Book';

export default function ListBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getAll().then(response => {
            setBooks(response);
        }).catch(err => console.error(err))
    }, []);

    const menuBooks = [
        {
            title: 'Currently Reading',
            shelf: 'currentlyReading'
        },
        {
            title: 'Want to Read',
            shelf: 'wantToRead'
        },
        {
            title: 'Read',
            shelf: 'read'
        }
    ]

    return (
        <div className="list-books-content">
        <div>
            {menuBooks.map(mb => (
                <div key={mb.shelf} className="bookshelf">
                    <h2 className="bookshelf-title">{mb.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.filter(book => book.shelf === mb.shelf).map(bookIsFiltered => (
                               <li key={bookIsFiltered.id}>
                                <Book bookIsFiltered={bookIsFiltered} books={books} setBooks={setBooks}></Book>
                               </li>
                            ))}
                        </ol>
                    </div>
                </div>
            ))}
        </div>
      </div>
    )
}