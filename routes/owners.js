import express from 'express'
import content from '../middleware/content.js'
import authO from '../middleware/authO.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  register,
  login,
  logout,
  extend,
  getInfo,
  updateInfo,
  getCases,
  ownerself,
  addFavorite,
  getFavorite,
  deletefav,
  getOwner,
  updateScroe
} from '../controllers/owners.js'

const router = express.Router()

// 註冊
router.post('/', content('application/json'), register)

// 按讚
router.patch('/visitor/:id', updateScroe)
// 更改會員資料
router.patch('/info', authO, updateInfo)
// 登入
router.post('/login', content('application/json'), login)
// token舊換新
router.post('/extend', authO, extend)
// 登出
router.delete('/logout', authO, logout)
// 取自己的資料
router.get('/me', authO, getInfo)

// 管理員拿取全部 owner 資料
router.get('/admin', auth, admin, getOwner)

// 找專業的頁面 不需要登入就能看見
router.get('/visitor', getCases)

// 案件頁面-本人
// router.get('/me/f', authO, getCasef)

// 收入收藏
router.post('/me/favorite', authO, addFavorite)
// 取得自己的收藏清單
router.get('/me/favorite', authO, getFavorite)
// 修改收藏清單
router.patch('/me/favorite', authO, deletefav)

// 訪客
router.get('/:id', ownerself)

export default router
