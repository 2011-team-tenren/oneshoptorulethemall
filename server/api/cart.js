const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {soupId, userId, quantity, price} = req.body

    const addToCart = await Cart.findOrCreate({
      where: {soupId, userId},
      defaults: {quantity, price}
    })
    res.json(addToCart)
  } catch (err) {
    next(err)
  }
})
