import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import uploadP from '../middleware/uploadP.js'
import {
  create,
  getPortfolios,
  getPortfolioById,
  updatePortfolioById,
  deletePortfolio,
  getPortfoliosOther
  // getPortfolioToSwiper
} from '../controllers/portfolios.js'

const router = express.Router()

router.post('/', auth, content('multipart/form-data'), uploadP, create)
// 本人
router.get('/me', auth, getPortfolios)
// 訪客
router.get('/visitor', getPortfoliosOther)

// router.get('/swiper', getPortfolioToSwiper)
router.get('/:id', getPortfolioById)
router.patch('/:id', auth, content('multipart/form-data'), uploadP, updatePortfolioById)
router.delete('/:id', auth, deletePortfolio)

export default router
