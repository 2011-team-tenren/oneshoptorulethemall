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

router.put('/:soupId', async (req, res, next) => {
  try {
    const soup = await Soup.findByPk(req.params.soupId)
    await soup.update(req.body)
    res.json(soup)
  } catch (err) {
    next(err)
  }
})

router.delete('/:soupId', async (req, res, next) => {
  try {
    const soup = await Soup.findByPk(req.params.soupId)
    await soup.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
