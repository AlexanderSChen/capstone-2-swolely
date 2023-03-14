import React from 'react';
import { render, screen } from '@testing-library/react';
import HorizontalScrollbar from './HorizontalScrollbar';

describe('HorizontalScrollbar', () => {
  const mockData = [
    { id: 1, name: 'Exercise 1' },
    { id: 2, name: 'Exercise 2' },
    { id: 3, name: 'Exercise 3' },
  ];

  test('renders the component', () => {
    render(<HorizontalScrollbar data={mockData} />);
    const component = screen.getByRole('list');
    expect(component).toBeInTheDocument();
  });

  test('renders each item in the data array', () => {
    render(<HorizontalScrollbar data={mockData} />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toEqual(mockData.length);
  });

  test('renders the LeftArrow and RightArrow components', () => {
    render(<HorizontalScrollbar data={mockData} />);
    const leftArrow = screen.getByAltText('right-arrow');
    const rightArrow = screen.getByAltText('right-arrow');
    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();
  });
});
