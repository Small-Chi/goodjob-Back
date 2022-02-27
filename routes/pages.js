import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import uploadP from '../middleware/uploadP.js'

import { create, getImg, deleteImg } from '../controllers/pages.js'
const router = express.Router()
// 新增
router.post('/', auth, admin, content('multipart/form-data'), uploadP, create)

// 拿取
router.get('/', getImg)

// 刪除
router.delete('/:id', auth, admin, deleteImg)

export default router
