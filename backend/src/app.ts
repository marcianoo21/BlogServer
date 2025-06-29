import express from 'express';
import cors from 'cors';
import connectDB from "./config/db";
import { userRouter } from './routes/auth';
import middleAuth from './middleware/authMiddleware';
import { postRouter } from './routes/posts';

const app = express();
const port = 3000;

connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

app.use('/api/posts', middleAuth, postRouter);
app.use('/api/auth', userRouter);
console.log(middleAuth)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
// npx ts-node src/app.ts

