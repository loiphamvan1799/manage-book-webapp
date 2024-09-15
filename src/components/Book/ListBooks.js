import { useState, useEffect } from "react"
import { getAll } from '../../BooksAPI'
import Self from './Self';

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
                <Self bookshelf={mb} books={books} setBooks={setBooks} ></Self>
            ))}
        </div>
      </div>
    )
}