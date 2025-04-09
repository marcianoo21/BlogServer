import express from 'express'
import connectDB from "./config/db";
const cors = require('cors')
const app = express()
const port = 3000

connectDB();

app.use(express.json())
app.use(cors())

const postsRouter = require('./routes/posts')
app.use('/posts', postsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

