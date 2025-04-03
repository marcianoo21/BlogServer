# Blog

A learning project for building a Node.js/Express API with TypeScript.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Build the TypeScript code:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```

## Development

For development with automatic reloading:

```bash
npm run dev
```

## API Endpoints

- GET `/start` - Returns a simple JSON object
- POST `/start/:no` - Requires a "club" field in the request body
- POST `/register` - Register a new user with name, email, and password

## Database

This project uses PostgreSQL. Make sure you have PostgreSQL running with the correct credentials as specified in `src/config/db.ts`.
