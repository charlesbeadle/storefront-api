CREATE TABLE
  IF NOT EXISTS order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders (id),
    product_id INTEGER REFERENCES products (id),
    product_quantity INTEGER
  );