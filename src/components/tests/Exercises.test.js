import { render } from '@testing-library/react';
import Exercises from '../Exercises';

describe('Exercises', () => {
  it('renders without crashing', () => {
    render(<Exercises exercises={[]} setExercises={() => {}} bodyPart="all" />);
  });

  it('renders the exercise cards', () => {
    const exercises = [
      {
        id: 1,
        name: 'Exercise 1',
        gifUrl: 'https://example.com/exercise1.gif',
        bodyPart: 'chest',
        target: 'strength'
      },
      {
        id: 2,
        name: 'Exercise 2',
        gifUrl: 'https://example.com/exercise2.gif',
        bodyPart: 'back',
        target: 'endurance'
      },
      {
        id: 3,
        name: 'Exercise 3',
        gifUrl: 'https://example.com/exercise3.gif',
        bodyPart: 'legs',
        target: 'flexibility'
      }
    ];

    const { getAllByRole } = render(<Exercises exercises={exercises} setExercises={() => {}} bodyPart="all" />);
    const exerciseCards = getAllByRole('link');

    expect(exerciseCards).toHaveLength(exercises.length);
  });

  it('renders the pagination component if there are more than 9 exercises', () => {
    const exercises = [
      {
        id: 1,
        name: 'Exercise 1',
        gifUrl: 'https://example.com/exercise1.gif',
        bodyPart: 'chest',
        target: 'strength'
      },
      {
        id: 2,
        name: 'Exercise 2',
        gifUrl: 'https://example.com/exercise2.gif',
        bodyPart: 'back',
        target: 'endurance'
      },
      {
        id: 3,
        name: 'Exercise 3',
        gifUrl: 'https://example.com/exercise3.gif',
        bodyPart: 'legs',
        target: 'flexibility'
      }
    ];

    const { getByRole } = render(<Exercises exercises={exercises} setExercises={() => {}} bodyPart="all" />);
    const pagination = getByRole('navigation');

    expect(pagination).toBeInTheDocument();
  });

  it('does not render the pagination component if there are less than or equal to 9 exercises', () => {
    const exercises = [
      {
        id: 1,
        name: 'Exercise 1',
        gifUrl: 'https://example.com/exercise1.gif',
        bodyPart: 'chest',
        target: 'strength'
      },
      {
        id: 2,
        name: 'Exercise 2',
        gifUrl: 'https://example.com/exercise2.gif',
        bodyPart: 'back',
        target: 'endurance'
      },
      {
        id: 3,
        name: 'Exercise 3',
        gifUrl: 'https://example.com/exercise3.gif',
        bodyPart: 'legs',
        target: 'flexibility'
      }
    ];

    const { queryByRole } = render(<Exercises exercises={exercises} setExercises={() => {}} bodyPart="all" />);
    const pagination = queryByRole('navigation');

    expect(pagination).not.toBeInTheDocument();
  });
});
