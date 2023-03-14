import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("<LoginForm />", () => {
  it("renders without errors", () => {
    render(<LoginForm login={() => {}} />);
  });

  it("displays errors if login fails", async () => {
    const loginMock = jest.fn(() => ({ success: false, errors: ["Invalid credentials"] }));
    const { getByText } = render(<LoginForm login={loginMock} />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    const errorElement = await getByText("Invalid credentials");
    expect(errorElement).toBeInTheDocument();
  });

  it("calls login function and redirects on successful login", async () => {
    const navigateMock = jest.fn();
    const loginMock = jest.fn(() => ({ success: true }));
    const { getByLabelText, getByText } = render(<LoginForm login={loginMock} navigate={navigateMock} />);
    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Submit");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);
    expect(loginMock).toHaveBeenCalledWith({ username: "testuser", password: "testpassword" });
    expect(navigateMock).toHaveBeenCalledWith("/posts");
  });
});
