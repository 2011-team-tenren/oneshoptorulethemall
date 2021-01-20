const router = require('express').Router()
const {Order, Soup} = require('../db/models')
//const {isSameUser} = require('./users')
module.exports = router

// Admin can see full order info, including soups
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: Soup})
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

// ONLY past Orders (isCart: false)
router.get('/user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const orderHistory = await Order.findAll({
      where: {userId, isCart: false},
      include: Soup
    })
    let soups = []
    orderHistory.map(order => {
      soups.push(order.soups)
    })
    res.send(orderHistory)
  } catch (err) {
    next(err)
  }
})

router.post('/guest/checkout', async (req, res, next) => {
  try {
    const order = await Order.create({
      isCart: false
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

//adding soup to order
router.put('/:orderId/soups/:soupId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    const soup = await Soup.findByPk(req.params.soupId)

    await order.addSoup(soup, {
      through: {
        quantity: req.body.quantity,
        price: soup.price * req.body.quantity
      }
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

//removing soup from order
router.delete('/:orderId/soups/:soupId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    const soup = await Soup.findByPk(req.params.soupId)

    await order.removeSoup(soup)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//editing soup in order
router.put(
  '/:orderId/soups/:soupId/quantity',

  async (req, res, next) => {
    try {
      const order = await Order.findByPk(req.params.orderId)
      const soup = await Soup.findByPk(req.params.soupId)

      await soup.setOrders(order, {
        through: {
          quantity: req.body.quantity,
          price: soup.price * req.body.quantity
        }
      })

      const editedOrder = await Order.findOne({
        where: {
          id: req.params.orderId,
          isCart: true
        },
        include: {
          model: Soup
        }
      })
      res.json(editedOrder)
    } catch (error) {
      next(error)
    }
  }
)
