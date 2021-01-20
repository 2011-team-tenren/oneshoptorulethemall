const router = require('express').Router()
const {Order, Soup, SoupOrder} = require('../db/models')
module.exports = router

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
router.put('/:orderId/soups/:soupId/quantity', async (req, res, next) => {
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
})
