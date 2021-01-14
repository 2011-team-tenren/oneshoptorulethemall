const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Soup = db.define('soup', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    //pennies in backend, price in dollars in front
    type: Sequelize.INTEGER,
    allowNull: false,
    min: 0
  },
  flavor: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.campbellsoup.ca/wp-content/uploads/2020/04/Campbells_Warhol_040820-1-2048x1071.jpg'
  },
  quantity: {
    type: Sequelize.INTEGER,
    min: 0
  }
})

module.exports = Soup
