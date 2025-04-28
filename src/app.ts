import express from 'express'
import connectDB from "./config/db";
import userRouter from "./controllers/authController"
import middleAuth from './middleware/authMiddleware';
const cors = require('cors')
const app = express()
const port = 3000

connectDB();

app.use(express.json())
app.use(cors())

const postsRouter = require('./routes/posts')
app.use('/posts', middleAuth, postsRouter)
app.use('/auth', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

