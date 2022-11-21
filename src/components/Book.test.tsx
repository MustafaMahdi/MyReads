import React from 'react';
import { render, screen } from '@testing-library/react';
import Book from './Book';
import { ShelvesType } from '../defines/defines';
import { Book as BookInterface } from "../models/book";
import userEvent from '@testing-library/user-event';

describe('Book component', () => {
    const props = {
        book: {
            authors: ['Thomas HelwysRichard'],
            title: 'A Short Declaration of the Mystery of Iniquity',
            shelf: ShelvesType.None, id: "id",
            imageLinks: {
                thumbnail: "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            }
        },
        currentShelf: ShelvesType.CurrentlyReading,
        onChangeShelf: (book: BookInterface, selectedShelf: string) => { },
    }
    it('renders Book Component', () => {

        render(<Book {...props} />);
        expect(screen.getByText(/A Short Declaration of the Mystery of Iniquity/i)).toBeVisible();
    });
    it('should render select', () => {
        render(<Book {...props} />);
        expect(screen.getByTestId('selectShelf')).toBeVisible();
    });
    it('should render book cover if has thumbnail', () => {
        render(<Book {...props} />);
        expect(props.book.imageLinks.thumbnail).toBeTruthy();
        expect(screen.getByTestId('bookCover')).toBeVisible();
    });
    it('should render Currently Reading', () => {
        render(<Book {...props} />);
        expect(screen.getByTestId('currentlyReading')).toBeVisible();
    });
    it('should render Want to read', () => {
        render(<Book {...props} />);
        expect(screen.getByTestId('wantToRead')).toBeVisible();
    });
    it('should render Read', () => {
        render(<Book {...props} />);
        expect(screen.getByTestId('read')).toBeVisible();
    });
    it('should render None', () => {
        render(<Book {...props} />);
        expect(screen.getByTestId('none')).toBeVisible();
    });
    it('test select options', () => {
        render(<Book {...props} />);

        userEvent.selectOptions(screen.getByTestId('selectShelf'), ShelvesType.CurrentlyReading)
        expect((screen.getByTestId<HTMLOptionElement>('wantToRead')).selected).toBeFalsy();
        expect((screen.getByTestId<HTMLOptionElement>('currentlyReading')).selected).toBeTruthy();
        expect(screen.getByTestId<HTMLOptionElement>('read').selected).toBeFalsy();
    })
});

