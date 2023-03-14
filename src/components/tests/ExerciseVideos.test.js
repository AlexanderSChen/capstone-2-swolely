import React from 'react';
import { render } from '@testing-library/react';
import ExerciseVideos from '../ExerciseVideos';

describe('ExerciseVideos component', () => {
  const exerciseVideos = [
    {
      video: {
        videoId: 'abcd1234',
        title: 'Exercise video 1',
        channelName: 'Fitness Channel',
        thumbnails: [{ url: 'https://example.com/thumbnail1.jpg' }]
      }
    },
    {
      video: {
        videoId: 'efgh5678',
        title: 'Exercise video 2',
        channelName: 'Fitness Channel',
        thumbnails: [{ url: 'https://example.com/thumbnail2.jpg' }]
      }
    },
    {
      video: {
        videoId: 'ijkl9012',
        title: 'Exercise video 3',
        channelName: 'Fitness Channel',
        thumbnails: [{ url: 'https://example.com/thumbnail3.jpg' }]
      }
    }
  ];

  it('renders exercise video cards', () => {
    const { getByText, getAllByRole } = render(<ExerciseVideos exerciseVideos={exerciseVideos} name="chest press" />);

    expect(getByText(/chest press/i)).toBeInTheDocument();
    expect(getAllByRole('link')).toHaveLength(3);
  });

  it('displays a loader when there are no exercise videos', () => {
    const { getByTestId } = render(<ExerciseVideos exerciseVideos={[]} name="chest press" />);

    expect(getByTestId('loader')).toBeInTheDocument();
  });
});
