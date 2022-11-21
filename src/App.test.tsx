import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';


describe('App component', () => {
  it('renders App Component and get books', async () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const booksElements = await screen.findAllByRole('list');
    expect(booksElements).not.toHaveLength(0);
  });

  it('current Route should be /bookShelves', () => {
    const history = createMemoryHistory({ initialEntries: ['/bookShelves'] });
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(history.location.pathname).toBe('/bookShelves');
  });
});

