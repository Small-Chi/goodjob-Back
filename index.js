import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import usersRouter from './routes/users.js'
import ownersRouter from './routes/owners.js'
import portfoliosRouter from './routes/portfolios.js'
import casesRouter from './routes/cases.js'
import chatsRoute from './routes/chats.js'
import pagesRoute from './routes/pages.js'
// import ordersRouter from './routes/orders.js'

mongoose.connect(process.env.DB_URL, () => {
  console.log('MongoDB Connected')
})

const app = express()
// step.1 處理前端的請求
app.use(
  cors({
    origin(origin, callback) {
      if (
        origin === undefined ||
        origin.includes('github') ||
        origin.includes('localhost') ||
        origin.includes('192.168')
      ) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed'), false)
      }
    }
  })
)
app.use((_, req, res, next) => {
  res.status(403).send({ success: false, message: '請求被拒絕' })
})

app.use(express.json())
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '資料格式錯誤' })
})

app.use('/users', usersRouter)
app.use('/owners', ownersRouter)
app.use('/portfolios', portfoliosRouter)
app.use('/cases', casesRouter)
app.use('/chats', chatsRoute)
app.use('/pages', pagesRoute)

app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到' })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started')
})
