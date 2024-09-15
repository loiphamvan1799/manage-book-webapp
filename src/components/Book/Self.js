import Book from './Book';

export default function Self({bookshelf, books, setBooks}) {

    return (
        <div key={bookshelf.shelf} className="bookshelf">
                    <h2 className="bookshelf-title">{bookshelf.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.filter(book => book.shelf === bookshelf.shelf).map(bookIsFiltered => (
                               <li key={bookIsFiltered.id}>
                                <Book bookIsFiltered={bookIsFiltered} books={books} setBooks={setBooks}></Book>
                               </li>
                            ))}
                        </ol>
                    </div>
        </div>
    )
}