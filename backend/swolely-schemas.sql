
CREATE TABLE users (username VARCHAR(25) PRIMARY KEY,
                    password TEXT NOT NULL,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    email TEXT NOT NULL
                        CHECK (position('@' IN email) > 1),
                    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE posts (id SERIAL PRIMARY KEY, 
                    title TEXT NOT NULL, 
                    description TEXT NOT NULL,
                    body TEXT, 
                    votes INT NOT NULL DEFAULT 0
                    -- username VARCHAR(25) NOT NULL REFERENCES users(username) ON DELETE CASCADE
                    );
                    
CREATE TABLE comments (id SERIAL PRIMARY KEY, 
                       text TEXT NOT NULL, 
                       post_id INT NOT NULL REFERENCES posts ON DELETE CASCADE
                    --    username VARCHAR(25) NOT NULL REFERENCES users(username) ON DELETE CASCADE
                       );

INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('alex', 'password123', 'Alex', 'Chen', 'achen@example.com'),
('stephen', 'passwordtest', 'Stephen', 'Test', 'stest@example.com');

INSERT INTO posts (title, description, body) VALUES
    ('First Post', 'Best post ever!', 'Everyone loves posting first. I win!'),
    ('Second Post', 'A very good post!', 'Oh well. Didnt get to be first.');

INSERT INTO comments (text, post_id) VALUES
    ('This is a really great post.', 1),
    ('I learned so much reading this.', 1);