import portfolios from '../models/portfolios.js'

export const create = async (req, res) => {
  try {
    const result = await portfolios.create({ ...req.body, image: req.file.path, user: req.user._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 本人
export const getPortfolios = async (req, res) => {
  try {
    const result = await portfolios.find({ user: req.user._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 訪客
export const getPortfoliosOther = async (req, res) => {
  try {
    const result = await portfolios.find({ user: req.query.user, sell: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getPortfolioById = async (req, res) => {
  try {
    const result = await portfolios.findById(req.params.id).populate('user', 'account ')
    console.log(result)
    if (result) {
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '找不到' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const updatePortfolioById = async (req, res) => {
  console.log(req.body)
  const data = {
    pname: req.body.pname,
    size: req.body.size,
    sunit: req.body.sunit,
    technology: req.body.technology,
    workingday: req.body.workingday,
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
    const result = await portfolios.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
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

export const deletePortfolio = async (req, res) => {
  console.log('刪除項目')
  try {
    await portfolios.findByIdAndDelete(req.params.id)
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

// export const getPortfolioToSwiper = async (req, res) => {
//   try {
//     const result = await portfolios.find({})
//     res.status(200).send({ success: true, message: '', result })
//   } catch (error) {
//     console.log(error)
//     res.status(500).send({ success: false, message: '伺服器錯誤' })
//   }
// }
