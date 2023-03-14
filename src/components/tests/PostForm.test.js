import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PostForm from './PostForm';

describe('PostForm component', () => {
  test('renders form elements', () => {
    render(<PostForm />);
    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    const categoryInput = screen.getByLabelText('Category');
    const bodyInput = screen.getByLabelText('Body');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('can fill out and submit form', async () => {
    const mockAddPost = jest.fn();
    const mockNewPost = { id: 1, title: 'Test Post', description: 'A test post', body: 'Some text', category: 'Strength' };
    jest.mock('../api/api', () => ({
      addPost: () => Promise.resolve(mockNewPost),
    }));
    render(<PostForm />);
    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    const categoryInput = screen.getByLabelText('Category');
    const bodyInput = screen.getByLabelText('Body');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.change(titleInput, { target: { value: 'Test Post' } });
    fireEvent.change(descriptionInput, { target: { value: 'A test post' } });
    fireEvent.change(categoryInput, { target: { value: 'Strength' } });
    fireEvent.change(bodyInput, { target: { value: 'Some text' } });
    fireEvent.click(submitButton);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(mockAddPost).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: 'Test Post',
      description: 'A test post',
      body: 'Some text',
      category: 'Strength',
    });
  });
});
