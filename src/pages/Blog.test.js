import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('Blog', () => {
  test('renders page title', () => {
    render(<Blog />);
    const titleElement = screen.getByText(/Fortify Your Mind/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders post list', () => {
    render(<Blog />);
    const postListElement = screen.getByRole('list', { name: /posts/i });
    expect(postListElement).toBeInTheDocument();
  });

  test('renders post form', () => {
    render(<Blog />);
    const postFormElement = screen.getByRole('form', { name: /add new post/i });
    expect(postFormElement).toBeInTheDocument();
  });
});
