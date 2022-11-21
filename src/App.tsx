import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import './App.css';
import BookShelves from './pages/BookShelves';
import Search from './pages/Search';
import { Book as BookInterface } from "./models/book";


function App() {
  const [books, setBooks] = useState<BookInterface[]>([])

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books)
    }
    )
  }, [])

  const changeShelfHandler = (book: BookInterface, shelf: string) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then((books) => {
      setBooks(books)
    }
    )
  }
  return (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/bookShelves" />
        </Route>
        <Route path="/bookShelves" exact>
          <BookShelves books={books} changeShelfHandler={changeShelfHandler} />
        </Route>
        <Route path="/search" exact>
          <Search books={books} changeShelfHandler={changeShelfHandler} />
        </Route>
      </Switch>
  );
}

export default App;
