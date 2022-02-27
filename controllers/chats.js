import chats from '../models/chats.js'
import mongoose from 'mongoose'

export const newMessageU = async (req, res) => {
  try {
    let result = await chats.findOneAndUpdate(
      {
        Umembers: {
          $all: [req.user._id.toString(), req.params.id]
        }
        // $and: [
        //   { Umembers: { $elemMatch: { $eq: req.user._id.toString() } } },
        //   { Umembers: { $elemMatch: { $eq: req.params.id } }}
        // ]
      },
      {
        $push: {
          Umessages: {
            sender: req.user._id,
            text: req.body.text
          }
        }
      },
      { new: true, runValidators: true }
    )
    if (!result) {
      result = await chats.create({
        Umembers: [req.user._id.toString(), req.params.id],
        Umessages: [{ sender: req.user._id, text: req.body.text }]
      })
    }
    res.status(200).send({ success: true, message: '', result: result.Umessages.pop() })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getChatU = async (req, res) => {
  try {
    if (req.query.gt) {
      const result = await chats.aggregate([
        {
          $match: {
            Umembers: {
              $all: [req.user._id, mongoose.Types.ObjectId(req.params.id)]
            }
          }
        },
        {
          $unwind: {
            path: '$Umessages'
          }
        },
        {
          $match: {
            'Umessages.date': {
              $gt: new Date(req.query.gt)
            }
          }
        },
        {
          $group: {
            _id: '$_id',
            Umessages: {
              $push: '$Umessages'
            }
          }
        }
      ])
      res.status(200).send({ success: true, message: '', result: result[0]?.Umessages || [] })
    } else if (req.query.lt) {
      const result = await chats.aggregate([
        {
          $match: {
            Umembers: {
              $all: [req.user._id, mongoose.Types.ObjectId(req.params.id)]
            }
          }
        },
        {
          $unwind: {
            path: '$Umessages'
          }
        },
        {
          $match: {
            'Umessages.date': {
              $lt: new Date(req.query.lt)
            }
          }
        },
        {
          $sort: {
            'Umessages.date': -1
          }
        },
        {
          $limit: 20
        },
        {
          $group: {
            _id: '$_id',
            Umessages: {
              $push: '$Umessages'
            }
          }
        }
      ])
      res.status(200).send({ success: true, message: '', result: result[0]?.Umessages || [] })
    } else {
      const result = await chats.findOne(
        {
          Umembers: {
            $all: [req.user._id.toString(), req.params.id]
          }
        },
        { Umessages: { $slice: -20 } }
      )
      res.status(200).send({ success: true, message: '', result: result?.Umessages || [] })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const newMessageO = async (req, res) => {
  try {
    let result = await chats.findOneAndUpdate(
      {
        Omembers: {
          $all: [req.owner._id.toString(), req.params.id]
        }
        // $and: [
        //   { Omembers: { $elemMatch: { $eq: req.owner._id.toString() } } },
        //   { Omembers: { $elemMatch: { $eq: req.params.id } }}
        // ]
      },
      {
        $push: {
          Omessages: {
            sender: req.owner._id,
            text: req.body.text
          }
        }
      },
      { new: true, runValidators: true }
    )
    if (!result) {
      result = await chats.create({
        Omembers: [req.owner._id.toString(), req.params.id],
        Omessages: [{ sender: req.owner._id, text: req.body.text }]
      })
    }
    res.status(200).send({ success: true, message: '', result: result.Omessages.pop() })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getChatO = async (req, res) => {
  try {
    if (req.query.gt) {
      const result = await chats.aggregate([
        {
          $match: {
            Omembers: {
              $all: [req.owner._id, mongoose.Types.ObjectId(req.params.id)]
            }
          }
        },
        {
          $unwind: {
            path: '$Omessages'
          }
        },
        {
          $match: {
            'Omessages.date': {
              $gt: new Date(req.query.gt)
            }
          }
        },
        {
          $group: {
            _id: '$_id',
            Omessages: {
              $push: '$Omessages'
            }
          }
        }
      ])
      res.status(200).send({ success: true, message: '', result: result[0]?.Omessages || [] })
    } else if (req.query.lt) {
      const result = await chats.aggregate([
        {
          $match: {
            Omembers: {
              $all: [req.owner._id, mongoose.Types.ObjectId(req.params.id)]
            }
          }
        },
        {
          $unwind: {
            path: '$Omessages'
          }
        },
        {
          $match: {
            'Omessages.date': {
              $lt: new Date(req.query.lt)
            }
          }
        },
        {
          $sort: {
            'Omessages.date': -1
          }
        },
        {
          $limit: 20
        },
        {
          $group: {
            _id: '$_id',
            Omessages: {
              $push: '$Omessages'
            }
          }
        }
      ])
      res.status(200).send({ success: true, message: '', result: result[0]?.Omessages || [] })
    } else {
      const result = await chats.findOne(
        {
          Omembers: {
            $all: [req.owner._id.toString(), req.params.id]
          }
        },
        { Omessages: { $slice: -20 } }
      )
      res.status(200).send({ success: true, message: '', result: result?.Omessages || [] })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
