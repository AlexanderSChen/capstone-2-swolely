import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ExerciseCard from './ExerciseCard';

const exercise = {
  id: 1,
  name: 'Push-ups',
  gifUrl: 'https://www.example.com/pushups.gif',
  bodyPart: 'Chest',
  target: 'Strength'
};

test('renders exercise card with correct information', () => {
  render(
    <BrowserRouter>
      <ExerciseCard exercise={exercise} />
    </BrowserRouter>
  );

  const exerciseName = screen.getByText('Push-ups');
  const bodyPartButton = screen.getByText('Chest');
  const targetButton = screen.getByText('Strength');
  const exerciseImage = screen.getByAltText('Push-ups');

  expect(exerciseName).toBeInTheDocument();
  expect(bodyPartButton).toBeInTheDocument();
  expect(targetButton).toBeInTheDocument();
  expect(exerciseImage).toHaveAttribute('src', 'https://www.example.com/pushups.gif');
});

test('renders link to exercise detail page', () => {
  render(
    <BrowserRouter>
      <ExerciseCard exercise={exercise} />
    </BrowserRouter>
  );

  const link = screen.getByRole('link');

  expect(link).toHaveAttribute('href', '/exercise/1');
});
