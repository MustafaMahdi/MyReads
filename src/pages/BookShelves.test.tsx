import React from 'react';
import { render, screen } from '@testing-library/react';
import BookShelves from './BookShelves';
import { ShelvesType } from '../defines/defines';
import { Book as BookInterface } from "../models/book";
import { BrowserRouter, Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Book from '../components/Book';

describe('BookShelves component', () => {
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
  }
  it('renders BookShelves Component', () => {
    render(<BrowserRouter><BookShelves {...props} /></BrowserRouter>);
    expect(screen.getByText(/MyReads: A Book Tracking App/i)).toBeVisible();


  });
  it('should render Currently Reading', () => {
    render(<BrowserRouter><BookShelves {...props} /></BrowserRouter>);
    expect(screen.getByTestId('currentlyReading')).toBeVisible();
  });
  it('should render Want to read', () => {
    render(<BrowserRouter><BookShelves {...props} /></BrowserRouter>);
    expect(screen.getByTestId('wantToRead')).toBeVisible();
  });
  it('should render Read', () => {
    render(<BrowserRouter><BookShelves {...props} /></BrowserRouter>);
    expect(screen.getByTestId('read')).toBeVisible();
  });
  it('should route to search page when click on the link action', () => {
    const component = renderer.create(
      <BrowserRouter><Link to="/search" /></BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('should render Book Component inside BookShelves component by check the title of book which rendered at the Book component', () => {
    render(<BrowserRouter><BookShelves {...props} /></BrowserRouter>);
    render(<Book book={props.books[0]} currentShelf={ShelvesType.CurrentlyReading} onChangeShelf={props.changeShelfHandler} />);
    expect(screen.getByText(/A Short Declaration of the Mystery of Iniquity/i)).toBeVisible();
  })
});

