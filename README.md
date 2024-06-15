# Car Rental Reservation Service

Welcome to the Car Rental Reservation Service! This project is a server-side application designed to handle car rental reservations. It is built with Node.js, TypeScript, and Express, and uses MongoDB as the database.

## Live Server

You can access the live server at [Car Rental Reservation Service](https://car-rental-reservation-service.vercel.app/).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Packages](#packages)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/car-rental-reservation-service.git
    cd car-rental-reservation-service
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add your environment variables. Here is an example:

    ```env

    # database
    MONGODB_URI=your-database-url

    # Jwt authentication
    BCRYPT_SALT_ROUND=12
    JWT_SECRET=your-jwt-secret
    JWT_EXPIRES_IN=1d
    JWT_REFRESH_SECRET=your-refresh-secret
    JWT_REFRESH_EXPIRES_IN=365d
    ```

## Usage

To start the development server, run:

```bash
npm run dev
