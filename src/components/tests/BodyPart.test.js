import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BodyPart from './BodyPart';

describe('BodyPart', () => {
  const item = 'legs';
  const setBodyPart = jest.fn();
  const bodyPart = 'chest';

  beforeEach(() => {
    setBodyPart.mockClear();
  });

  it('should render the body part card with the correct props', () => {
    render(<BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />);
    expect(screen.getByText(item)).toBeInTheDocument();
    expect(screen.getByAltText('dumbbell')).toBeInTheDocument();
  });

  it('should call setBodyPart function and scroll to section when the card is clicked', () => {
    render(<BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />);
    userEvent.click(screen.getByRole('button'));
    expect(setBodyPart).toHaveBeenCalledWith(item);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 1800, left: 100, behavior: 'smooth' });
  });

  it('should highlight the card if it matches the selected body part', () => {
    render(<BodyPart item={bodyPart} setBodyPart={setBodyPart} bodyPart={bodyPart} />);
    expect(screen.getByRole('button')).toHaveStyle({ borderTop: '4px solid #fcc757' });
  });
});
