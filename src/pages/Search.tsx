import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShelvesType } from '../defines/defines';
import { Book as BookInterface } from "../models/book";
import Book from '../components/Book';
import * as BooksAPI from "../BooksAPI";



const Search: React.FC<{
    books: BookInterface[],
    changeShelfHandler: (book: BookInterface, selectedShelf: string) => void
}> = (props) => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchBooksResult, setSearchBooksResult] = useState<BookInterface[]>([]);

    const getSearchResult = (searchQuery:string) => {

        if (searchQuery.length !== 0) {
            BooksAPI.search(searchQuery).then((matchedBooks) => {
                if (matchedBooks.error) {
                    setSearchBooksResult([]);
                } else {
                    setSearchBooksResult(matchedBooks);
                }
            });
        } else {
            setSearchBooksResult([]);
        }
    }
    const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        getSearchResult(event.target.value);
    }

    const matchedBooks = searchBooksResult.map(matchedBook => {
        let shelf = ShelvesType.None;
        props.books.forEach(book => {
            if (book.id === matchedBook.id) {
                shelf = book.shelf
            }
        })
        return (
            <li key={matchedBook.id}>
                <Book
                    book={matchedBook}
                    onChangeShelf={props.changeShelfHandler}
                    currentShelf={shelf}
                />
            </li>

        )
    });

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search" >Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by Title Or Author"
                        value={searchInput}
                        onChange={searchInputHandler}
                    />
                </div>
            </div>

            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        matchedBooks
                    }
                </ol>
            </div>
        </div>
    );
};

export default Search;