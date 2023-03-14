import React from 'react';
import { render } from '@testing-library/react';
import SignupForm from './SignupForm';

it('renders the SignupForm component', () => {
    render(<SignupForm />);
});

it('updates form data on user input', () => {
    const { getByLabelText } = render(<SignupForm />);
    const usernameInput = getByLabelText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
});

it('submits the form and redirects on successful signup', async () => {
    const signup = jest.fn().mockResolvedValue({ success: true });
    const navigate = jest.fn();
    const { getByText } = render(<SignupForm signup={signup} navigate={navigate} />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    expect(signup).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/blog');
});
  
it('displays form errors on unsuccessful signup', async () => {
    const signup = jest.fn().mockResolvedValue({ success: false, errors: ['Invalid username'] });
    const { getByText } = render(<SignupForm signup={signup} />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    const errorMessage = getByText('Invalid username');
    expect(errorMessage).toBeInTheDocument();
});