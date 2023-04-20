## Storefront API

Udacity Full Stack JavaScript Developer Nanodegree Program

Project 2

This API provides the essential functionality required for an online storefront, allowing users to browse a list of all products, view specific product details, and add products to an order that can be viewed in a cart
page.

## Installation

Create a Postgres database. By default, the project uses a database called _storefront_, which is included in the _.env.example_ file and _database.json_ file.

Create a database user and password. Like the database name, the database user and password are included in the example env file and database.json file.

Grant the user all privileges on all tables in the database.

Change directories to the root of the project and install the packages by running:

`npm install`

Rename the ".env.example" file to ".env".
If you are using a database, user, password etc that differ from what's included in the env file, then be sure to make changes there, and in the database.json file.

Run the database migrations.

`db-migrate up`

Start the application server.

`npm run start`

## Additional Scripts

Tests

`npm run test`
