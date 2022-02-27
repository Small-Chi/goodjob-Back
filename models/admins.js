import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const adminSchema = new mongoose.Schema(
  {
    adminname: {
      type: String,
      unique: true,
      required: [true, '名稱為必填']
    },
    account: {
      type: String,
      minlength: [4, '帳號必須 4 個字以上'],
      maxlength: [20, '帳號必須 20 個字以下'],
      unique: true,
      required: [true, '帳號為必填']
    },
    password: {
      type: String,
      required: [true, '密碼為必填']
    },
    tokens: {
      type: [String]
    },
    email: {
      type: String,
      required: [true, '信箱為必填'],
      unique: true,
      validate: {
        validator(email) {
          return validator.isEmail(email)
        },
        message: '信箱格式不正確'
      }
    },
    role: {
      // 0 = 接案者
      // 1 = 委託人
      // 2 = 管理員
      type: Number,
      default: 2
    },
    image: {
      type: String
    },
    article: {
      type: [articles]
    },
    report: {
      type: [reports]
    }
  },
  { versionKey: false }
)

adminSchema.pre('save', function (next) {
  const admin = this
  if (admin.isModified('password')) {
    if (admin.password.length >= 4 && admin.password.length <= 20) {
      admin.password = md5(admin.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

adminSchema.pre('findOneAndUpdate', function (next) {
  const admin = this._update
  if (admin.password) {
    if (admin.password.length >= 4 && admin.password.length <= 20) {
      admin.password = md5(admin.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

export default mongoose.model('admins', adminSchema)
