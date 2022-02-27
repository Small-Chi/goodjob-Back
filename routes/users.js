import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  register,
  login,
  logout,
  extend,
  getInfo,
  updateInfo,
  getPortfolios,
  userself,
  addFavorite,
  getFavorite,
  deletefav,
  getUser,
  updateScroe
  // addCart,
  // getCart,
  // updateCart
} from '../controllers/users.js'

const router = express.Router()

// 註冊
router.post('/', content('application/json'), register)

// 按讚
router.patch('/visitor/:id', updateScroe)
// 更改會員資料
router.patch('/info', auth, updateInfo)
// 登入
router.post('/login', content('application/json'), login)
// token舊換新
router.post('/extend', auth, extend)
// 登出
router.delete('/logout', auth, logout)
// 拿取自己的資料
router.get('/me', auth, getInfo)

// 管理員拿取全部 user 資料
router.get('/admin', auth, admin, getUser)

// 找專業的頁面使用 不需要登入就能看見
router.get('/visitor', getPortfolios)
// 收入收藏
router.post('/me/favorite', auth, addFavorite)
// 取得自己的收藏清單
router.get('/me/favorite', auth, getFavorite)
// 修改收藏清單
router.patch('/me/favorite', auth, deletefav)

// 訪客
router.get('/:id', userself)

export default router
