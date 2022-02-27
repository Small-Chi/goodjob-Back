import jwt from 'jsonwebtoken'
import owners from '../models/owners.js'

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || ''
    if (token.length > 1) {
      const decoded = jwt.decode(token)
      req.owner = await owners.findOne({ _id: decoded._id, tokens: token })
      req.token = token
      if (req.owner) {
        jwt.verify(token, process.env.SECRET)
        next()
      } else {
        throw new Error()
      }
    } else {
      throw new Error()
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError' && req.baseUrl === '/owners' && req.path === '/extend') {
      next()
    } else {
      res.status(401).send({ success: false, message: '驗證錯誤' })
    }
  }
}
