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
- Create '/users' [POST]

#### Orders

- Current Order by user (args: user id)[token required] '/orders/:id' [GET]

## Data Shapes

#### Products

- id
- name
- price 

#### Users

- id
- firstname 
- lastname 
- password

#### Orders

- id
- user_id
- status of order (active or complete)
- id of each product in the order
- quantity of each product in the order

### Database Schemas

Table: products (id:integer [primary key], name:varchar(255), price:numeric(6,2))

Table: users (id:integer [primary key], firstname:varchar(255), lastname:varchar(255), password:text)

Table: orders (id:integer [primary key], user_id:integer [foreign key references users(id)], status:varchar(10))

Table: order_products (id:integer [primary key], order_id:integer [foreign key references orders(id)], product_id:integer [foreign key references products(id)], product_quantity: integer)



