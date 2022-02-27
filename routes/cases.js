import express from 'express'
import content from '../middleware/content.js'
import authO from '../middleware/authO.js'
import auth from '../middleware/auth.js'
import uploadC from '../middleware/uploadC.js'
import {
  create,
  getCases,
  updateCaesById,
  deleteCase,
  getCaseById,
  getCasesOther,
  wantDo,
  getWantdo,
  NwantDo,
  getHasuser,
  NoDo,
  cantDo,
  getHasowner,
  getAgreen
} from '../controllers/cases.js'

const router = express.Router()

// 新增案件
router.post('/', authO, content('multipart/form-data'), uploadC, create)
// 本人
router.get('/me', authO, getCases)
// 訪客
router.get('/visitor', getCasesOther)

// 訪客
router.get('/wantdo', getWantdo)

// 取得指定案件
router.get('/:id', getCaseById)
// 編輯案件內容
router.patch('/:id', authO, content('multipart/form-data'), uploadC, updateCaesById)
// 刪除案件
router.delete('/:id', authO, deleteCase)
// 編輯案件內容
router.patch('/deal/:id', auth, wantDo)
router.patch('/dealN/:id', auth, NwantDo)
router.patch('/dealNO/:id', authO, NoDo)
router.patch('/dealO/:id', authO, cantDo)

// 業主本人，看是誰投稿
router.get('/me/hasuser', authO, getHasuser)

// 業主本人，看進行結案
router.get('/me/agreen', authO, getAgreen)

// 接案本人
router.get('/me/hasowner', auth, getHasowner)

export default router
