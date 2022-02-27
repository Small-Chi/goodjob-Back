import cases from '../models/cases.js'

export const create = async (req, res) => {
  try {
    const result = await cases.create({ ...req.body, image: req.file.path, owner: req.owner._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      console.log(error)
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 本人
export const getCases = async (req, res) => {
  try {
    const result = await cases.find({ owner: req.owner._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 訪客
export const getCasesOther = async (req, res) => {
  try {
    console.log(req.query.owner)
    const result = await cases.find({ owner: req.query.owner, sell: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getCaseById = async (req, res) => {
  try {
    const result = await cases.findById(req.params.id).populate('owner', 'account')
    console.log(result)
    if (result) {
      res.status(200).send({ success: true, message: '', result })
    } else {
      console.log(error)
      res.status(404).send({ success: false, message: '找不到' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      console.log(error)
      res.status(404).send({ success: false, message: '找不到' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const updateCaesById = async (req, res) => {
  console.log(req.body)
  const data = {
    casename: req.body.casename,
    size: req.body.size,
    sunit: req.body.sunit,
    quantity: req.body.quantity,
    qunit: req.body.qunit,
    technology: req.body.technology,
    endingday: req.body.endingday,
    takeday: req.body.takeday,
    price: req.body.price,
    sell: req.body.sell,
    category: req.body.category,
    description: req.body.description
  }
  console.log(data)
  if (req.file) {
    data.image = req.file.path
  }
  try {
    const result = await cases.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    console.log(result)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      console.log(error)
      res.status(404).send({ success: false, message: '找不到' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const deleteCase = async (req, res) => {
  console.log('刪除項目')
  try {
    await cases.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    console.log('刪除失敗錯誤')
    if (error.name === 'CastError') {
      console.log(error)
      res.status(404).send({ success: false, message: '找不到項目' })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const wantDo = async (req, res) => {
  try {
    // 找欄位
    const deal = await cases.findById(req.params.id, 'deal')
    console.log(deal)
    deal.deal.push(req.body.deal)
    deal.save({ validateBeforeSave: false })
    res.status(200).send({ success: true, message: '', deal })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 投稿
export const getWantdo = async (req, res) => {
  try {
    const result = await cases.find({ sell: true }).populate('owner', 'account')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// export const wantDo = async (req, res) => {
//   try {
//     // 找欄位
//     const deal = await cases.findById(req.params.id, 'deal')
//     console.log(deal)
//     deal.deal.push({ users: req.user.id })
//     deal.save({ validateBeforeSave: false })
//     res.status(200).send({ success: true, message: '', deal })
//   } catch (error) {
//     console.log(error)
//     res.status(500).send({ success: false, message: '伺服器錯誤' })
//   }
// }

// // 投稿
// export const getWantdo = async (req, res) => {
//   try {
//     const result = await cases.find({ sell: true })
//     res.status(200).send({ success: true, message: '', result })
//   } catch (error) {
//     res.status(500).send({ success: false, message: '伺服器錯誤' })
//   }
// }

// 返回未投稿
export const NwantDo = async (req, res) => {
  try {
    console.log(req.user._id)
    await cases.findByIdAndUpdate(req.params.id, {
      // 刪除陣列元素
      $pull: {
        // 欄位名稱
        deal: req.user._id
      }
    })
    res.status(200).send({ success: true, message: '取消' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 業者本人查看有投稿的 user
export const getHasuser = async (req, res) => {
  try {
    const result = await cases.find({ owner: req.owner._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 不同意投稿
export const NoDo = async (req, res) => {
  try {
    await cases.findByIdAndUpdate(req.params.id, {
      // 刪除陣列元素
      $pull: {
        // 欄位名稱
        deal: req.body.userId
      }
    })
    res.status(200).send({ success: true, message: '取消' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 業主丟ID進去
export const cantDo = async (req, res) => {
  try {
    // 找欄位
    const deal = await cases.findById(req.params.id, 'deal')
    console.log(deal)
    deal.deal.push(req.body.deal)
    deal.save({ validateBeforeSave: false })
    res.status(200).send({ success: true, message: '', deal })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 接案人查看有同意的 owner
export const getHasowner = async (req, res) => {
  try {
    const result = await cases.find({ sell: true }).populate('owner', 'account')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 業主本人查看同意的案子
export const getAgreen = async (req, res) => {
  try {
    const result = await cases.find({ owner: req.owner._id }).populate('deal', 'account')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
