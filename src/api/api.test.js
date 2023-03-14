import SwolelyApi from './SwolelyApi';

describe('SwolelyApi', () => {
  beforeAll(() => {
    SwolelyApi.token = 'test-token';
  });

  describe('getCurrentUser', () => {
    it('gets the current user', async () => {
      const user = await SwolelyApi.getCurrentUser('testuser');
      expect(user).toEqual({
        username: 'testuser',
        name: 'Test User',
        email: 'testuser@test.com',
        bio: 'Test bio'
      });
    });
  });

  describe('getPosts', () => {
    it('gets posts with given title', async () => {
      const posts = await SwolelyApi.getPosts('workout');
      expect(posts).toHaveLength(2);
      expect(posts[0]).toHaveProperty('title', 'Great workout!');
    });
  });

  describe('addPost', () => {
    it('adds a new post', async () => {
      const data = {
        title: 'New post',
        body: 'This is a new post',
        username: 'testuser'
      };
      const post = await SwolelyApi.addPost(data);
      expect(post).toHaveProperty('title', 'New post');
      expect(post).toHaveProperty('body', 'This is a new post');
      expect(post).toHaveProperty('username', 'testuser');
    });
  });

  describe('updatePost', () => {
    it('updates a post', async () => {
      const id = 1;
      const data = {
        title: 'Updated post',
        body: 'This is an updated post'
      };
      const post = await SwolelyApi.updatePost(id, data);
      expect(post).toHaveProperty('title', 'Updated post');
      expect(post).toHaveProperty('body', 'This is an updated post');
    });
  });

  describe('deletePost', () => {
    it('deletes a post', async () => {
      const id = 1;
      const message = await SwolelyApi.deletePost(id);
      expect(message).toBe('Post deleted');
    });
  });

  describe('getComments', () => {
    it('gets comments for a post', async () => {
      const postId = 2;
      const comments = await SwolelyApi.getComments(postId);
      expect(comments).toHaveLength(1);
      expect(comments[0]).toHaveProperty('text', 'Great post!');
    });
  });

  describe('login', () => {
    it('logs in a user', async () => {
      const data = {
        username: 'testuser',
        password: 'password'
      };
      const token = await SwolelyApi.login(data);
      expect(token).toBeDefined();
    });
  });

  describe('signup', () => {
    it('signs up a user', async () => {
      const data = {
        username: 'newuser',
        password: 'password',
        name: 'New User',
        email: 'newuser@test.com'
      };
      const token = await SwolelyApi.signup(data);
      expect(token).toBeDefined();
    });
  });
});
