const router = require('express').Router()
const {Order, Soup, SoupOrder} = require('../db/models')
module.exports = router

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
