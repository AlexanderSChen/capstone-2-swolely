import { render } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('contains the logo image', () => {
    const { getByAltText } = render(<Footer />);
    const logoImage = getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('displays the name of the creator', () => {
    const { getByText } = render(<Footer />);
    const creatorName = getByText('Made with Love by Alexander Chen');
    expect(creatorName).toBeInTheDocument();
  });

  it('has a blue background color', () => {
    const { container } = render(<Footer />);
    const footerBox = container.firstChild;
    expect(footerBox).toHaveStyle('background-color: #0b8fd7');
  });
});
