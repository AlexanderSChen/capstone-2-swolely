import { render } from '@testing-library/react';
import SimilarExercises from './SimilarExercises';

describe('SimilarExercises', () => {
  const targetMuscleExercises = [{id: 1, name: 'Exercise 1'}, {id: 2, name: 'Exercise 2'}];
  const equipmentExercises = [{id: 3, name: 'Exercise 3'}, {id: 4, name: 'Exercise 4'}];

  it('should render "Exercises that target the same muscle group" section with data', () => {
    const { getByText } = render(<SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />);
    expect(getByText('Exercises that target the same muscle group')).toBeInTheDocument();
    expect(getByText('Exercise 1')).toBeInTheDocument();
    expect(getByText('Exercise 2')).toBeInTheDocument();
  });

  it('should render "Exercises that use the same equipment" section with data', () => {
    const { getByText } = render(<SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />);
    expect(getByText('Exercises that use the same equipment')).toBeInTheDocument();
    expect(getByText('Exercise 3')).toBeInTheDocument();
    expect(getByText('Exercise 4')).toBeInTheDocument();
  });

  it('should render loader when target muscle exercises data is empty', () => {
    const { getByTestId } = render(<SimilarExercises targetMuscleExercises={[]} equipmentExercises={equipmentExercises} />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('should render loader when equipment exercises data is empty', () => {
    const { getByTestId } = render(<SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={[]} />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });
});
