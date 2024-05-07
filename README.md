# eCommerce Monorepo

This repository contains a monorepo setup for an eCommerce application, consisting of three packages: `client`, `server`, and `shared`.

## Installation

To get started, clone this repository:

bash

Copy code

`git clone <repository-url>
cd ecommerce-monorepo`

### Installing Dependencies

Before running the client or server, you need to install dependencies for each package. Navigate to each package's directory and run:

bash

Copy code

`cd client
npm install
cd ../server
npm install
cd ../shared
npm install`

## Development

To start the development servers for the client and server, run the following commands:

### Client

bash

Copy code

`cd client
npm run dev`

The client will be running at http://localhost:3000.

### Server

bash

Copy code

`cd server
npm run dev`

The server will be running at http://localhost:5000.

## Shared Package

The `shared` package contains code shared between the client and server, such as TypeScript types, utilities, or constants.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
