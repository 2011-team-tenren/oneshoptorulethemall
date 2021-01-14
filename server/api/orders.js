const router = require('express').Router()
const {Order, Soup, SoupOrder} = require('../db/models')
module.exports = router

/* ORDER ROUTES  */

// GET all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// GET a specific order
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId
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

/* ORDER ROUTES BY USER */

// Create a new order for user
router.post('/user/:userId', async (req, res, next) => {
  try {
    const order = await Order.create({userId: req.params.userId})
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})

//Get cart for user
router.get('/user/:userId/cart', async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true
      },
      include: {
        model: Soup
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// Get all orders for a user
router.get('/user/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: {
        model: Soup
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

/* ORDER ROUTES BY ORDER */

// Put request to add a new soup to an order
router.put('/:orderId/soups', async (req, res, next) => {
  const soupId = req.body.soup.id
  const soupPrice = req.body.soup.price
  const soupQuantity = req.body.quantity

  try {
    newProductOrder = await SoupOrder.create({
      soupId: soupId,
      quantity: soupQuantity,
      price: soupPrice * soupQuantity,
      orderId: req.params.orderId
    })

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
