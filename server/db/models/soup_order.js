const Sequelize = require('sequelize')
const db = require('../db')

const SoupOrder = db.define('soup_order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = SoupOrder
