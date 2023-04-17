# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index '/products' [GET]
- Show '/products/:id' [GET]
- Create [token required] '/products' [POST]

#### Users

- Index [token required] '/users' [GET]
- Show [token required] '/users/:id' [GET]
- Create N[token required] '/users' [POST]

#### Orders

- Current Order by user (args: user id)[token required] '/orders/:id' [GET]

## Data Shapes

#### Products

- id: SERIAL PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- price: NUMERIC(6, 2) NOT NULL

#### Users

- id: SERIAL PRIMARY KEY
- firstname: VARCHAR(255) NOT NULL
- lastname: VARCHAR(255) NOT NULL
- password: text NOT NULL

#### Orders

- id: SERIAL PRIMARY KEY (orders table)
- status of order (active or complete): VARCHAR(10) NOT NULL (orders table)
- user_id: INTEGER REFERENCES users (id) NOT NULL (orders table)
- id of each product in the order: SERIAL PRIMARY KEY (products table)
- quantity of each product in the order: INTEGER NOT NULL (order_products table)
