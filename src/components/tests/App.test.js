import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar component', () => {
  render(<App />);
  const navbarElement = screen.getByTestId('navbar');
  expect(navbarElement).toBeInTheDocument();
});

test('renders home component for path /', () => {
    render(<App />);
    const homeElement = screen.getByTestId('home');
    expect(homeElement).toBeInTheDocument();
});

test('renders footer component', () => {
    render(<App />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
});

test('renders login form component for path /login', () => {
    render(<App />);
    const loginFormElement = screen.getByTestId('login-form');
    expect(loginFormElement).toBeInTheDocument();
});

test('renders signup form component for path /signup', () => {
    render(<App />);
    const signupFormElement = screen.getByTestId('signup-form');
    expect(signupFormElement).toBeInTheDocument();
});
  
  
  
  
  