CREATE TABLE
  IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id) NOT NULL,
    status VARCHAR(10) NOT NULL
  );