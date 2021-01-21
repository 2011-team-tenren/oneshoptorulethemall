const router = require('express').Router()
const {User, Order, Soup} = require('../db/models')
module.exports = router
module.exports.isSameUser = isSameUser
module.exports.isUserAdmin = isUserAdmin

//gatekeeping middleware
function isSameUser(req, res, next) {
  if (req.user.id !== Number(req.params.userId)) {
    console.log('requserid', req.user.id)
    console.log('reqparamns.userId', req.params.userId)
    res.sendStatus(401)

    return
  }
  next()
}

function isUserAdmin(req, res, next) {
  console.log(req.user.access)
  if (!req.user.access) {
    res.sendStatus(401)
    return
  }
  next()
}

router.get('/', isUserAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'access']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isSameUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: {
        model: Order,
        where: {
          isCart: true
        }
      }
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
})

//creating user order
router.post('/:userId/order', isSameUser, async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.params.userId
    })
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})

//get cart items
router.get('/:userId/order', isSameUser, async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isCart: true
      },
      include: {
        model: Soup
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//checkout
router.put('/:userId/checkout', isSameUser, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true
      }
    })
    await order.update({isCart: false})
    const newOrder = await Order.create({
      userId: req.params.userId
    })
    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
})
