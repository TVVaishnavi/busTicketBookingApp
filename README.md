# Bus Ticket Booking App (Backend)

## Description

In this project, we can see how the signup, login, admin functionalities, and other bookings, such as booking and canceling tickets and viewing the bus details, work in the app's background.

## Table of Contents

1. [Installation](#installation)
2. [Technologies Used](#technologies-used)
3. [Database Setup](#database-setup)
4. [Running Tests](#running-tests)
5. [File Structure](#file-structure)

## Installation

1. Create a folder on the desktop and open it in Visual Studio Code.
2. Create a repository on GitHub and connect it to the folder in Visual Studio Code.
3. Open the terminal in Visual Studio Code and use these commands to connect GitHub:
   1. `git init`
   2. `git remote add origin https://github.com/yourusername/your-repository`
   3. `git add .`
   4. `git commit -m "initial commit"`
   5. `git push -u origin master`
4. Install the libraries: `npm`, `mongoose`, `express`, `bcrypt`, `cors`, `crypto`, `date-fns`, `jwt`, `nodemon`, `uuid`.
5. In Visual Studio Code Explorer, some files will be uploaded automatically after installing libraries: `node_modules`, `package-lock.json`, and `package.json`.

## Technologies Used

1. Backend Libraries: Express.js
2. Database: MongoDB
3. Database Shell: MongoDB Shell (mongosh)
4. Authentication: JSON Web Tokens (JWT)

## Database Setup

1. Go to Atlas MongoDB, create a database, and copy the URL.
2. Paste the URL into the `.env` file to connect it with Express.js.
3. Install mongoose using the command: `npm install mongoose`.

## Running Tests

1. To run the code and check, use the command: `npm run dev`.
2. Create a `.rest` extension file, request the respective section, and take the response.
3. Additionally, Postman is an application that can check for signup, login, and ticket booking details.

## File Structure

1. **server**: Entry point of the project where I set up and started the server.
2. **utils**: Contains utility functions/helpers that are reusable across the project.
3. **services**: Contains the project's logic that supports the controllers.
4. **routes**: Defines the endpoints and routes for the server.
5. **models**: Defines the schema for your MongoDB collections.
6. **middleware**: Contains middleware functions.
7. **controllers**: Manages the logic for different routes.
8. **config**: Contains configuration files such as database setup.
