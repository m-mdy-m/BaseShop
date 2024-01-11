# BaseShop Project Readme

## Overview

BaseShop is a web application built with Node.js and Express.js that allows users to interact with a product catalog. The project includes features such as user registration, product management, cart functionality, and a secure password recovery mechanism. It follows the MVC (Model-View-Controller) architecture for organized code structure.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/m-mdy-m/BaseShop.git
   ```

2. Change into the project directory:

   ```bash
   cd BaseShop
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server will run on port 3000 by default. Open your browser and navigate to `http://localhost:3000` to access the application.

## Features

1. **User Registration:**
   - Users can register for an account.
   - Email verification link is sent via Nodemailer to confirm user identity.

2. **Product Interaction:**
   - Users can view products without registering.
   - After registration, users can create, edit, and delete their own products.

3. **Cart Functionality:**
   - Users can add products to their cart.

4. **User Panel:**
   - Registered users can access a panel to manage their own products.
   - Users can delete or edit only their own created products.

5. **Password Recovery:**
   - Nodemailer is used to send a password recovery link to the user's email.
   - Clicking the link redirects the user to a page to change their password.

6. **Security Measures:**
   - bcryptjs is used for password hashing.
   - csurf helps protect against Cross-Site Request Forgery (CSRF) attacks.

7. **File Upload:**
   - multer is used for handling file uploads.

## Usage

- Until registration, users can only browse products.
- After registration, users gain access to additional features, such as creating, editing, and deleting products, as well as managing their cart.

## API Endpoints

- **GET /products:** Retrieve a list of products.
- **POST /products:** Create a new product.
- **PUT /products/:id:** Update a product.
- **DELETE /products/:id:** Delete a product.

## License

This project is licensed under the [MIT License](https://github.com/m-mdy-m/BaseShop/blob/main/LICENSE).

## Author

- **Mahdi**
- GitHub: [m-mdy-m](https://github.com/m-mdy-m)

## Acknowledgements

Special thanks to the contributors and the open-source community for their valuable contributions.

Feel free to explore the repository: [BaseShop Repository](https://github.com/m-mdy-m/BaseShop.git)