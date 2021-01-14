'use strict'

const db = require('../server/db')
const {User, Soup} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123', access: true})
  ])

  const soups = await Promise.all([
    Soup.create({
      name: 'Campbells Chicken Noodle Soup',
      price: 600,
      ingredient: 'chicken',
      quantity: 1000
    }),
    Soup.create({
      name: 'Vegetable Soup',
      price: 600,
      ingredient: 'vegetable',
      quantity: 1000
    }),
    Soup.create({
      name: 'Kimchee Jigae',
      price: 500,
      ingredient: 'kimchee',
      quantity: 1000
    }),
    Soup.create({
      name: 'Cream of Broccoli',
      price: 8000,
      ingredient: 'broccoli',
      quantity: 1000
    })
  ])

  const [cody, murphy] = await User.findAll()
  const [chicken, veggie, kimchee, broccoli] = await Soup.findAll()

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${soups.length} soups`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
