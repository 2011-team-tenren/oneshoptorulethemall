const router = require('express').Router()
const {Soup} = require('../db/models')
const {isUserAdmin} = require('./users')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const soups = await Soup.findAll()
    res.json(soups)
  } catch (err) {
    next(err)
  }
})

router.post('/', isUserAdmin, async (req, res, next) => {
  try {
    const {name, price, quantity, flavor, imageUrl} = req.body
    let newSoup = await Soup.create({name, price, quantity, flavor, imageUrl})
    res.status(201).send(newSoup)
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

router.put('/:soupId', isUserAdmin, async (req, res, next) => {
  try {
    const soup = await Soup.findByPk(req.params.soupId)
    await soup.update(req.body)
    res.json(soup)
  } catch (err) {
    next(err)
  }
})

router.delete('/:soupId', isUserAdmin, async (req, res, next) => {
  try {
    const soup = await Soup.findByPk(req.params.soupId)
    await soup.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
