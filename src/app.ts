import express from 'express'
import connectDB from "./config/db";
import { userRouter } from './routes/auth'
import middleAuth from './middleware/authMiddleware';
import { postRouter } from './routes/posts'

const cors = require('cors')
const app = express()
const port = 3000

connectDB();

app.use(express.json())
app.use(cors())

app.use('/posts', middleAuth, postRouter)
app.use('/auth', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

