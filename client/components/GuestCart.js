import React, {Component} from 'react'

let retrievedOrder = JSON.parse(localStorage.getItem('order'))
let order = Object.values(retrievedOrder)

export class GuestCart extends Component {
  constructor() {
    super()
    this.state = {
      qty: 0,
      cart: {}
    }
    this.editQtyClick = this.editQtyClick.bind(this)
    this.editQtyChange = this.editQtyChange.bind(this)
    this.removeSoupClick = this.removeSoupClick.bind(this)
  }

  componentDidMount() {}

  editQtyClick(soup, evt) {
    evt.preventDefault()
    // let retrievedOrder = JSON.parse(localStorage.getItem('order'))
    // let order = Object.values(retrievedOrder)
    // console.log('order', order)
    let updatedOrder = {}
    order.map(currentSoup => {
      if (currentSoup.id === soup.id) {
        currentSoup.orderQuantity = this.state.qty
      }
      updatedOrder[currentSoup.flavor] = currentSoup
      return currentSoup
    })
    // let stringOrder =
    console.log('UPDATED ORDER:', updatedOrder)
    this.setState({cart: updatedOrder})
    console.log('CART STATE', this.state)
    localStorage.setItem('order', JSON.stringify({...updatedOrder}))
  }

  removeSoupClick(soup, evt) {
    evt.preventDefault()
    let updatedOrder = {}
    order.filter(currentSoup => {
      if (currentSoup.id !== soup.id) {
        updatedOrder[currentSoup.flavor] = currentSoup
        return currentSoup
      }
    })
    console.log(updatedOrder)
    localStorage.setItem('order', JSON.stringify({...updatedOrder}))
    console.log(localStorage)
  }

  editQtyChange(event) {
    this.setState({[event.target.name]: Number(event.target.value)})
    // console.log('qty state', this.state)
  }

  render() {
    // let retrievedOrder = JSON.parse(localStorage.getItem('order'))
    // let order = Object.values(retrievedOrder)
    console.log('order in render', order)
    return (
      <div>
        {order.map((soup, idx) => {
          return (
            <div key={idx}>
              <h1>{soup.name}</h1>
              <img src={soup.imageUrl} />
              <h2>Price: ${soup.price / 100}</h2>
              <h2>Quantity: {soup.orderQuantity}</h2>
              <form>
                <label htmlFor="Edit Quantity">Edit Quantity</label>
                <input
                  name="qty"
                  type="number"
                  max="30"
                  min="0"
                  value={this.state.qty}
                  onChange={this.editQtyChange}
                />
                <button
                  type="submit"
                  onClick={() => {
                    this.editQtyClick(soup, event)
                  }}
                >
                  Update
                </button>
                <div>
                  Remove {soup.flavor} soups:{' '}
                  <button
                    type="submit"
                    onClick={() => this.removeSoupClick(soup, event)}
                  >
                    {' '}
                    X{' '}
                  </button>
                </div>
              </form>
              <h2>
                {soup.flavor} Total Price: $
                {soup.price * soup.orderQuantity / 100}
              </h2>
              <h2 />
            </div>
          )
        })}
        <div>
          <button>Checkout</button>
        </div>
      </div>
    )
  }
}
