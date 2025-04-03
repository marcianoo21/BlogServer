// Update the db.ts to not close the client prematurely
import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  password: 'trolik21',
  host: 'localhost',
  port: 5433,
  database: 'mydb',
});

client
  .connect()
  .then(() => {
    console.log('Base connected!');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

// Define a User interface
interface User {
  name: string;
  email: string;
  password: string;
}

// Define the return type from the database
interface DbUser extends User {
  id: number;
  created_at?: Date;
}

export const createUser = async (user: User): Promise<DbUser> => {
  const { name, email, password } = user;
  try {
    const result = await client.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;  // Make sure to throw the error so it's caught by the calling function
  }
};
