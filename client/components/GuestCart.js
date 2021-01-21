import React, {Component} from 'react'
import axios from 'axios'

export class GuestCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 0,
      cart: Object.values(JSON.parse(localStorage.getItem('order')))
    }
    this.editQtyClick = this.editQtyClick.bind(this)
    this.editQtyChange = this.editQtyChange.bind(this)
    this.removeSoupClick = this.removeSoupClick.bind(this)
    this.checkoutClick = this.checkoutClick.bind(this)
  }

  async editQtyClick(soup, evt) {
    evt.preventDefault()
    let updatedOrder = {}
    let orderArr = this.state.cart.map(currentSoup => {
      if (currentSoup.id === soup.id) {
        currentSoup.orderQuantity = this.state.qty
      }
      updatedOrder[currentSoup.flavor] = currentSoup
      return currentSoup
    })
    await this.setState({cart: orderArr})
    localStorage.setItem('order', JSON.stringify({...updatedOrder}))
  }

  editQtyChange(event) {
    this.setState({[event.target.name]: Number(event.target.value)})
  }

  async removeSoupClick(soup, evt) {
    evt.preventDefault()
    let updatedOrder = {}
    let orderArr = this.state.cart.filter(currentSoup => {
      if (currentSoup.id !== soup.id) {
        updatedOrder[currentSoup.flavor] = currentSoup
        return currentSoup
      }
    })
    await this.setState({cart: orderArr})
    localStorage.setItem('order', JSON.stringify({...updatedOrder}))
  }

  async checkoutClick(event) {
    event.preventDefault()
    alert(' Your order has been placed.  Please check your email.')
    try {
      const order = await axios.post('/api/orders/guest/checkout')
      let idx = 0
      while (idx < this.state.cart.length) {
        await axios.put(
          `/api/orders/${order.data.id}/soups/${this.state.cart[idx].id}`,
          {
            quantity: this.state.cart[idx].orderQuantity
          }
        )
        idx++
      }
      let emptyCart = JSON.stringify({})
      localStorage.setItem('order', emptyCart)
      this.setState({cart: []})
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const imageStyle = {
      height: '20rem',
      width: 'auto'
    }
    let cart = this.state.cart || []

    return (
      <div>
        <section className="cart-container">
          {cart.length ? (
            <div>
              {cart.map((soup, idx) => {
                return (
                  <div key={idx} className="cart-item">
                    <h1>{soup.name}</h1>
                    <img src={soup.imageUrl} className="cartImg" />
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
                        <button
                          className="remove"
                          type="submit"
                          onClick={() => this.removeSoupClick(soup, event)}
                        >
                          {' '}
                          Remove{' '}
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
              <div className="checkout-button">
                <button
                  className="checkout"
                  type="submit"
                  onClick={event => this.checkoutClick(event, cart)}
                >
                  Would You like to Checkout?
                </button>
              </div>
            </div>
          ) : (
            <h1>There are currently no soups in your cart!</h1>
          )}
        </section>
      </div>
    )
  }
}
