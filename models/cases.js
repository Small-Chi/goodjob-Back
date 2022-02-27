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

const caseSchema = new mongoose.Schema(
  {
    casename: {
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
    quantity: {
      type: String
    },
    qunit: {
      type: String
    },
    technology: {
      type: []
    },
    endingday: {
      type: Date
    },
    takeday: {
      type: Date
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
      maxlength: [140, '作品介紹字數過多']
    },
    progress: {
      // 0 = 無
      // 1 = 進行中
      // 2 = 已結案
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.ObjectId,
      ref: 'users',
      default: null
    },
    owner: {
      type: mongoose.ObjectId,
      ref: 'owners'
    },
    assess: {
      // 0 = 無
      // 1 = 好評
      // -1 = 差評
      type: Number,
      default: 0
    },
    // 按鈕其中一人點了以後id會進來這個陣列，判斷 1.裡面有沒有人，有的話就不要重複 push。2.兩個人的 id 都進去就轉成結案狀態。
    deal: {
      type: [mongoose.ObjectId],
      ref: 'users'
    }
    // deal: {
    //   type: [
    //     {
    //       users: {
    //         type: mongoose.ObjectId,
    //         ref: 'users'
    //       },
    //       owner: {
    //         type: mongoose.ObjectId,
    //         ref: 'owners'
    //       }
    //     }
    //   ]
    // }
    // 按收藏的接案者
    // userf: {
    //   type: [mongoose.ObjectId],
    //   ref: 'users'
    // }
  },
  { versionKey: false }
)

export default mongoose.model('cases', caseSchema)
