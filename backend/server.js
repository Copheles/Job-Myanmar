
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import path from 'path'
import mongoose from 'mongoose'
import { app, server } from './socket/socket.js'

// db and authenticateUser
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import commentRouter from './routes/commentRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticatedUser from './middleware/auth.js'

mongoose.set('strictQuery', false)

const __dirname = path.resolve();

if(process.env.NODE_ENV === 'production'){
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authenticatedUser, jobsRouter)
app.use('/api/v1/comments', commentRouter)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    server.listen(port, ()=> {
      console.log(`Server is listening on port http://localhost:${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()