import { update } from "../../BooksAPI"

export default function Book({bookIsFiltered, books, setBooks}) {

    const changeShelf = (bookChange, sheltToChange) => {
        update(bookChange, sheltToChange).then(() => {
            changePosition(books, bookChange.id, sheltToChange)
        }).catch(err => console.error(err))
    }

    const changePosition = (AllBook, idBookChange, sheltToChange) => {
        const listBookChanged = AllBook.map(book => {
            if (book.id === idBookChange) {
                book.shelf = sheltToChange
            }
            return book;
        })
        setBooks(listBookChanged)
    }

    const displayChangeSelf = () => {
        return (
            <select value={bookIsFiltered.shelf} onChange={(event) => changeShelf(bookIsFiltered, event.target.value)}>
                <option value="" disable>
                    {bookIsFiltered.shelf === "none" ? "Add to..." : "Move to..."}
                </option>
                <option value="currentlyReading">
                    Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        )
    }

    return (
        <div className="book">
            <div className="book-top">
                <div 
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            bookIsFiltered.imageLinks && `url(${bookIsFiltered.imageLinks.thumbnail})`,
                    }}>
                </div>
                <div className="book-shelf-changer">
                    {displayChangeSelf()}
                </div>
            </div>
            <div className="book-title">{bookIsFiltered.title}</div>
            <div className="book-authors">{bookIsFiltered.authors && bookIsFiltered.authors.join(', ')}</div>
        </div>
    )
}