const query = [
  {
    $match: {
      _id: 'asd'
    }
  },
  {
    $lookup: {
      from: 'cases',
      localField: '_id',
      foreignField: 'owner',
      as: 'cases'
    }
  },
  {
    $unwind: {
      path: '$cases',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'cases._id',
      foreignField: 'favorite',
      as: 'cases.favorite'
    }
  },
  {
    $addFields: {
      'cases.favorite': {
        $size: '$cases.favorite'
      }
    }
  },
  {
    $group: {
      _id: '$_id',
      account: {
        $first: '$account'
      },
      cases: {
        $addToSet: '$cases'
      },
      good: {
        $first: '$good'
      },
      bad: {
        $first: '$bad'
      },
      ownername: {
        $first: '$ownername'
      }
    }
  }
]

query.splice(4, 0, {
  $match: {
    'cases.sell': true
  }
})

const result = await owners.aggregate(query)
