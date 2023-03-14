import { render, screen } from '@testing-library/react';
import HeroBanner from './HeroBanner';

describe('HeroBanner component', () => {
  test('renders the app name', () => {
    render(<HeroBanner />);
    const appName = screen.getByText(/Swolely/i);
    expect(appName).toBeInTheDocument();
  });

  test('renders the app tagline', () => {
    render(<HeroBanner />);
    const tagline = screen.getByText(/The Best Exercise App/i);
    expect(tagline).toBeInTheDocument();
  });

  test('renders the "Explore Exercises" button', () => {
    render(<HeroBanner />);
    const button = screen.getByRole('button', { name: /explore exercises/i });
    expect(button).toBeInTheDocument();
  });

  test('renders the banner image', () => {
    render(<HeroBanner />);
    const bannerImage = screen.getByAltText(/banner/i);
    expect(bannerImage).toBeInTheDocument();
  });
});
