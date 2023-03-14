import React from 'react';
import { render, screen } from '@testing-library/react';
import ExerciseDetail from '../ExerciseDetail';

describe('ExerciseDetail', () => {
  it('renders the exercise detail section', async () => {
    const exercise = {
      id: 1,
      name: 'Bench Press',
      target: 'Chest',
      equipment: 'Barbell',
      description: 'Lay on a bench and press a barbell away from your chest.'
    };
    const mockFetchData = jest.fn(() => Promise.resolve(exercise));
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ json: mockFetchData }));

    const { container } = render(<ExerciseDetail match={{ params: { id: 1 } }} />);

    expect(container.querySelector('.exercise-detail')).toBeInTheDocument();
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Chest')).toBeInTheDocument();
    expect(screen.getByText('Barbell')).toBeInTheDocument();
    expect(screen.getByText('Lay on a bench and press a barbell away from your chest.')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it('renders the exercise videos section', async () => {
    const exerciseVideos = [
      {
        id: 1,
        title: 'Bench Press Tutorial',
        videoUrl: 'https://www.youtube.com/watch?v=1tODC9YbECM'
      },
      {
        id: 2,
        title: 'How to Bench Press',
        videoUrl: 'https://www.youtube.com/watch?v=Zu3fZKjPfms'
      }
    ];
    const mockFetchData = jest.fn(() => Promise.resolve({ contents: exerciseVideos }));
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ json: mockFetchData }));

    const { container } = render(<ExerciseDetail match={{ params: { id: 1 } }} />);

    expect(container.querySelector('.exercise-videos')).toBeInTheDocument();
    expect(screen.getByText('Bench Press Tutorial')).toBeInTheDocument();
    expect(screen.getByText('How to Bench Press')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it('renders the similar exercises section', async () => {
    const targetMuscleExercises = [
      { id: 2, name: 'Incline Bench Press', target: 'Chest', equipment: 'Barbell' },
      { id: 3, name: 'Chest Fly', target: 'Chest', equipment: 'Dumbbell' }
    ];
    const equipmentExercises = [
      { id: 4, name: 'Barbell Row', target: 'Back', equipment: 'Barbell' },
      { id: 5, name: 'Dumbbell Row', target: 'Back', equipment: 'Dumbbell' }
    ];
    const mockFetchData = jest.fn(() => Promise.resolve(targetMuscleExercises));
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ json: mockFetchData }));

    const { container } = render(<ExerciseDetail match={{ params: { id: 1 } }} />);

    expect(container.querySelector('.similar-exercises')).toBeInTheDocument();
    expect(screen.getByText('Incline Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Chest Fly')).toBeInTheDocument();
    expect(screen.getByText('Barbell Row')).toBeInTheDocument();
    expect(screen.getByText('Dumbbell Row')).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});
