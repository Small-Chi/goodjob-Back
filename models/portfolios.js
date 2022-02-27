import mongoose from 'mongoose'

const categories = {
  平面設計: [
    '海報/DM',
    '書籍/手冊',
    '創作',
    'CIS/VIS/ICON',
    '攝影',
    '產品/包裝',
    '插畫/漫畫',
    '簡報',
    '織品服裝設計',
    '其他'
  ],
  網頁設計: [
    '版型設計',
    '切版製作',
    'EDM設計',
    'Banner',
    '維護/經營',
    '行銷/SEO',
    '程式設計/架設',
    '商品上架',
    'UI/UX設計',
    '其他'
  ],
  室內設計: [
    '室內空間設計',
    '櫥窗陳列展示',
    '房屋/建築設計',
    '展場/舞台設計',
    '店面/商業空間設計',
    '景觀園藝設計',
    '產品設計',
    '水電及其他工程繪圖',
    '3D繪圖/渲染',
    '其他'
  ],
  手作設計: ['紙藝', '皮件', '木質', '棉/麻', '花草植栽', '羊毛', '陶瓷', '編織', '其他']
}

const portfolioSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      required: [true, '作品名為必填'],
      maxlength: [10, '作品名稱字數過多']
    },
    size: {
      type: String
    },
    sunit: {
      type: String
    },
    technology: {
      type: []
    },
    workingday: {
      type: String
    },
    price: {
      type: String
    },
    image: {
      type: String
    },
    sell: {
      type: Boolean,
      default: false
    },
    category: {
      big: {
        type: String,
        default: ''
      },
      small: {
        type: String,
        default: ''
      }
    },
    description: {
      type: String,
      maxlength: [100, '作品介紹字數過多']
    },
    user: {
      type: mongoose.ObjectId,
      ref: 'users'
    }
    // 按收藏的業主
    // ownerf: {
    //   type: [mongoose.ObjectId],
    //   ref: 'owners'
    // }
  },
  { versionKey: false }
)

export default mongoose.model('portfolios', portfolioSchema)
