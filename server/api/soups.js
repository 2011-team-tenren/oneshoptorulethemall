const router = require('express').Router()
const {Soup} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const soups = await Soup.findAll()
    res.json(soups)
  } catch (err) {
    next(err)
  }
})

router.get('/:soupId', async (req, res, next) => {
  try {
    const soup = await Soup.findByPk(req.params.soupId)
    res.json(soup)
  } catch (err) {
    next(err)
  }
})
