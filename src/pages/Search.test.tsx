import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { createMemoryHistory } from 'history';
import { ShelvesType } from '../defines/defines';
import { Book as BookInterface } from "../models/book";
import Book from '../components/Book';
import userEvent from '@testing-library/user-event';



describe('Search component', () => {
  const props = {
    books: [{
      authors: ['Thomas HelwysRichard'],
      title: 'A Short Declaration of the Mystery of Iniquity',
      shelf: ShelvesType.None, id: "id",
      imageLinks: {
        thumbnail: "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      }
    }],
    changeShelfHandler: (book: BookInterface, selectedShelf: string) => { },
  };
  it('renders Search Component', () => {
    render(<BrowserRouter><Search {...props} /></BrowserRouter>);
  });

  it('should route to BookShelves page when click on the link action', () => {
    const component = renderer.create(
      <BrowserRouter><Link to="/" /></BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('current Route should be /bookShelves', () => {
    const history = createMemoryHistory({ initialEntries: ['/search'] });
    const { getByText } = render(
      <Router history={history}>
        <Search {...props} />
      </Router>
    );
    expect(history.location.pathname).toBe('/search');
  });

  it('should render Book Component inside Search component by check the title of book which rendered at the Book component', () => {
    render(<BrowserRouter><Search {...props} /></BrowserRouter>);
    render(<Book book={props.books[0]} currentShelf={ShelvesType.CurrentlyReading} onChangeShelf={props.changeShelfHandler} />);
    expect(screen.getByText(/A Short Declaration of the Mystery of Iniquity/i)).toBeVisible();
  });

  it('test search input', () => {
    render(<BrowserRouter><Search {...props} /></BrowserRouter>);

    userEvent.type(screen.getByRole('textbox'), 'Thomas HelwysRichard')
    expect(screen.getByRole('textbox')).toHaveValue('Thomas HelwysRichard')
  })
});

