import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import Home from './Home';

describe('Home', () => {
  test('renders "Welcome Back" message if user is logged in', () => {
    const currentUser = { username: 'testuser' };
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser }}>
          <Home />
        </UserContext.Provider>
      </BrowserRouter>
    );
    const welcomeMessage = screen.getByText(/welcome back/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders "Log In" and "Sign Up" links if user is not logged in', () => {
    const currentUser = null;
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser }}>
          <Home />
        </UserContext.Provider>
      </BrowserRouter>
    );
    const loginLink = screen.getByText(/log in/i);
    const signupLink = screen.getByText(/sign up/i);
    expect(loginLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });

  test('renders hero banner', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{}}>
          <Home />
        </UserContext.Provider>
      </BrowserRouter>
    );
    const heroBanner = screen.getByRole('img', { name: /hero banner/i });
    expect(heroBanner).toBeInTheDocument();
  });

  test('renders search bar and exercises', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{}}>
          <Home />
        </UserContext.Provider>
      </BrowserRouter>
    );
    const searchExercises = screen.getByRole('search', { name: /search exercises/i });
    const exercises = screen.getByRole('list', { name: /exercises/i });
    expect(searchExercises).toBeInTheDocument();
    expect(exercises).toBeInTheDocument();
  });
});
