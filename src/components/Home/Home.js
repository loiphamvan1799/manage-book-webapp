import React from "react";
import ListBooks from '../Book/ListBooks';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <ListBooks />
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        </div>
    )
}