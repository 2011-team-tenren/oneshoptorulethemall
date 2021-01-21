'use strict'

const db = require('../server/db')
const {User, Order, Soup} = require('../server/db/models')

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
      flavor: 'Chicken',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/91tY%2BHe2AQL._SL1500_.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Shin Ramen',
      price: 600,
      flavor: 'Ramen',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81PWUPAU5jL._SL1500_.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Kimchee Jjigae',
      price: 600,
      flavor: 'Jjigae',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/Korean_stew-Kimchi_jjigae-05.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Seolleongtang',
      price: 600,
      flavor: 'Beef',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/3/3d/Seolleongtang.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Pho',
      price: 600,
      flavor: 'Beef',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/5/53/Pho-Beef-Noodles-2008.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Gazpacho',
      price: 600,
      flavor: 'Vegetable',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/3/35/Gazpacho_con_su_guarnici%C3%B3n_-_jlastras.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Goulash',
      price: 600,
      flavor: 'Beef',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/0/0a/2009-09-gulasch-p%C3%B6rk%C3%B6lt-paprikas-3.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Gumbo',
      price: 600,
      flavor: 'Seafood',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Gumbo.JPG',
      quantity: 1000
    }),
    Soup.create({
      name: 'Miso',
      price: 600,
      flavor: 'Vegetable',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/0/00/Miso_Soup.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Tomato',
      price: 600,
      flavor: 'Vegetable',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/419Iy1-DfNL._AC_.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Wonton',
      price: 600,
      flavor: 'Pork',
      imageUrl:
        'https://hips.hearstapps.com/del.h-cdn.co/assets/17/33/1502989468-wonton-soup-delish-1.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Borscht',
      price: 600,
      flavor: 'Vegetable',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/a/a7/Borscht_served.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Clam Chowder',
      price: 600,
      flavor: 'Seafood',
      imageUrl:
        'https://www.simplyhappyfoodie.com/wp-content/uploads/2018/01/instant-pot-clam-chowder-2-500x500.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'French Onion',
      price: 600,
      flavor: 'Vegetable',
      imageUrl:
        'https://www.foodiecrush.com/wp-content/uploads/2012/12/French-Onion-Soup-foodiecrush.com-027-1.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Sundubu',
      price: 600,
      flavor: 'Jjigae',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/b/bb/Korean.food-Sundubu.jjigae-01a.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Top Ramen',
      price: 600,
      flavor: 'Ramen',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81b2xi7jIQL._SL1500_.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Sapporo Ichiban',
      price: 600,
      flavor: 'Ramen',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/916cFHczeIL._SL1500_.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Cup Noodle',
      price: 600,
      flavor: 'Ramen',
      imageUrl:
        'https://richmedia.ca-richimage.com/ImageDelivery/imageService?profileId=12026540&id=795546&recipeId=728',
      quantity: 1000
    }),
    Soup.create({
      name: 'Progresso',
      price: 600,
      flavor: 'Chicken',
      imageUrl:
        'https://www.thespruceeats.com/thmb/JsrBfcRWo_prC4pEsrkt8FDxxQY=/1500x1500/smart/filters:no_upscale()/ProgressoChickenNoodleSoup-738c1f399b8a476d9522560dc487bb01.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Budae',
      price: 600,
      flavor: 'Jjigae',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Korean.cuisine-Budae.jjigae-01.jpg',
      quantity: 1000
    }),
    Soup.create({
      name: 'Miyeok-guk',
      price: 600,
      flavor: 'Jjigae',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/3/36/Miyeok-guk.jpg',
      quantity: 1000
    })
  ])

  const [cody] = await User.findAll()

  const order = await Order.create()
  await cody.addOrder(order)

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
