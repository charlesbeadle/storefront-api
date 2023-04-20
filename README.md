## Storefront API

Udacity Full Stack JavaScript Developer Nanodegree Program

Project 2

This API provides the essential functionality required for an online storefront, allowing users to browse a list of all products, view specific product details, and add products to an order that can be viewed in a cart
page.

## Installation

1. Create a Postgres database. By default, the project uses a database called _storefront_, which is included in the _.env.example_ file and _database.json_ file.

2. Create a database user and password. Like the database name, the database user and password are included in the example env file and database.json file.

3. Grant the user all privileges on all tables in the database.

4. Change directories to the root of the project and install the packages by running:
   `npm install`

5. Rename the ".env.example" file to ".env".
   If you are using a database, user, password etc that differ from what's included in the env file, then be sure to make changes there, and in the database.json file.

6. Run the database migrations.
   `db-migrate up`

7. Start the application server.
   `npm run start`   
   By default, the server runs on port 3000.

## Usage Examples For Reviewer

### **Create a user:**

[POST] localhost:3000/users

Content-Type: application/json

Select the "raw" radio button to be able to paste the JSON in the text area.

`{
    "firstname": "Charles",
    "lastname": "Beadle",
    "password": "password"
}`

_save the token for other requests_

### **Create a product**:

[POST] localhost:3000/products

Content-Type: application/json

A token is required. In Postman, the token can be added under Headers. Key: Authorization, Value: Bearer ...the token (keep a space character between Bearer and the token, and don't wrap the token in quotes.)

Select the "raw" radio button to be able to paste the JSON in the text area.

`{
    "name": "Shake Weight",
    "price": "19.99"
}
`

### **Create an order**:

[POST] localhost:3000/orders

Content-Type: application/json

A token is required. In Postman, the token can be added under Headers. Key: Authorization, Value: Bearer ...the token (keep a space character between Bearer and the token, and don't wrap the token in quotes.)

Select the "raw" radio button to be able to paste the JSON in the text area.

In the example below, *uid* represents a user id. Within products, the id is a product id.

`{
    "uid": "1",
    "products": [
        {
            "id": "1",
            "quantity": "1"
        }
    ]
}`

## Other Routes
The routes to make the GET requests can all be found in the REQUIREMENTS.md file.

## Additional Scripts

Tests

`npm run test`
