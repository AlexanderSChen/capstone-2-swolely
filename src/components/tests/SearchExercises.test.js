import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchExercises from './SearchExercises';

describe('SearchExercises', () => {
  test('renders search input and button', () => {
    render(<SearchExercises />);

    const searchInput = screen.getByPlaceholderText('Deadlift, Chest, Cables...');
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();
  });

  test('updates search input value when typed in', () => {
    render(<SearchExercises />);

    const searchInput = screen.getByPlaceholderText('Deadlift, Chest, Cables...');
    fireEvent.change(searchInput, { target: { value: 'chest' } });
    expect(searchInput.value).toBe('chest');
  });

  test('calls handleSearch function when search button is clicked', () => {
    const handleSearch = jest.fn();
    render(<SearchExercises handleSearch={handleSearch} />);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
    expect(handleSearch).toHaveBeenCalled();
  });

  test('renders body part list', () => {
    const bodyParts = ['all', 'chest', 'back', 'legs'];
    const setBodyPart = jest.fn();
    render(<SearchExercises bodyParts={bodyParts} setBodyPart={setBodyPart} />);

    const allBodyPart = screen.getByText('All');
    expect(allBodyPart).toBeInTheDocument();

    const chestBodyPart = screen.getByText('Chest');
    expect(chestBodyPart).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: 'Back' });
    expect(backButton).toBeInTheDocument();
  });
});
