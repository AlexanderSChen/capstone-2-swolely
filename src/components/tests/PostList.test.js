import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostList from "./PostList";

describe("PostList", () => {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      description: "Description 1",
      body: "Body 1",
    },
    {
      id: 2,
      title: "Post 2",
      description: "Description 2",
      body: "Body 2",
    },
  ];

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(posts),
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it("should render all posts", async () => {
    render(<PostList />);
    const post1 = await screen.findByText("Post 1");
    const post2 = await screen.findByText("Post 2");
    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });

  it("should delete a post", async () => {
    render(<PostList />);
    const deleteButton = await screen.findByText("Delete");
    fireEvent.click(deleteButton);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should edit a post", async () => {
    render(<PostList />);
    const editButton = await screen.findByText("Edit");
    fireEvent.click(editButton);
    const titleInput = await screen.findByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    const saveButton = await screen.findByText("Save");
    fireEvent.click(saveButton);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
