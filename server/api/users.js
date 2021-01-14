const router = require('express').Router()
const {User, Order, Soup} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
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

//creating user order
router.post('/:userId/order', async (req, res, next) => {
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
router.get('/:userId/order', async (req, res, next) => {
  try {
    const order = await Order.findOne({
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
router.put('/:userId/checkout', async (req, res, next) => {
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
