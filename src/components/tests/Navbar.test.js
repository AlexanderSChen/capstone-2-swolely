import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './Navbar';

test('renders the logo', () => {
  const { getByAltText } = render(<BrowserRouter><Navbar /></BrowserRouter>);
  const logo = getByAltText('logo');
  expect(logo).toBeInTheDocument();
});

test('renders the "Home" link', () => {
  const { getByText } = render(<BrowserRouter><Navbar /></BrowserRouter>);
  const homeLink = getByText('Home');
  expect(homeLink).toBeInTheDocument();
});

test('renders the "Exercises" link', () => {
  const { getByText } = render(<BrowserRouter><Navbar /></BrowserRouter>);
  const exercisesLink = getByText('Exercises');
  expect(exercisesLink).toBeInTheDocument();
});

test('renders the "Blog" link', () => {
  const { getByText } = render(<BrowserRouter><Navbar /></BrowserRouter>);
  const blogLink = getByText('Blog');
  expect(blogLink).toBeInTheDocument();
});
