import pages from '../models/pages.js'

// 新增輪播圖圖片
export const create = async (req, res) => {
  try {
    const result = await pages.create({ ...req.body, image: req.file.path })
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

// 拿取
export const getImg = async (req, res) => {
  try {
    const result = await pages.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      // 資料錯誤
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ sucess: false, message: error.errors[key].name })
    } else {
      // 其他錯誤
      res.status(500).send({ sucess: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除輪播圖圖片
export const deleteImg = async (req, res) => {
  try {
    await pages.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    console.log('deleteCarouselImg錯誤')
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到商品' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
