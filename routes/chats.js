import express from 'express'
import auth from '../middleware/auth.js'
import authO from '../middleware/authO.js'
import { getChatU, newMessageU, getChatO, newMessageO } from '../controllers/chats.js'

const router = express.Router()
router.get('/Umembers/:id', auth, getChatU)
router.post('/Umembers/:id/messages', auth, newMessageU)

router.get('/Omembers/:id', authO, getChatO)
router.post('/Omembers/:id/messages', authO, newMessageO)

export default router
