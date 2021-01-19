import React, {Component} from 'react'

let retrievedOrder = JSON.parse(localStorage.getItem('order'))
let order = Object.values(retrievedOrder)

export class GuestCart extends Component {
  constructor() {
    super()
    this.state = {
      qty: 0,
      cart: order
    }
    this.editQtyClick = this.editQtyClick.bind(this)
    this.editQtyChange = this.editQtyChange.bind(this)
    this.removeSoupClick = this.removeSoupClick.bind(this)
  }

  async editQtyClick(soup, evt) {
    evt.preventDefault()
    let updatedOrder = {}
    let orderArr = order.map(currentSoup => {
      if (currentSoup.id === soup.id) {
        currentSoup.orderQuantity = this.state.qty
      }
      updatedOrder[currentSoup.flavor] = currentSoup
      return currentSoup
    })
    await this.setState({cart: orderArr})
    localStorage.setItem('order', JSON.stringify({...updatedOrder}))
  }

  async removeSoupClick(soup, evt) {
    evt.preventDefault()
    let updatedOrder = {}
    let orderArr = order.filter(currentSoup => {
      if (currentSoup.id !== soup.id) {
        updatedOrder[currentSoup.flavor] = currentSoup
        return currentSoup
      }
    })
    console.log(updatedOrder)
    await this.setState({cart: orderArr})
    localStorage.setItem('order', JSON.stringify({...updatedOrder}))
    console.log(localStorage)
  }

  editQtyChange(event) {
    this.setState({[event.target.name]: Number(event.target.value)})
  }

  render() {
    const imageStyle = {
      height: '20rem',
      width: 'auto'
    }
    return (
      <div>
        {this.state.cart.map((soup, idx) => {
          return (
            <div key={idx}>
              <h1>{soup.name}</h1>
              <img src={soup.imageUrl} style={imageStyle} />
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
          <button type="submit">Checkout</button>
        </div>
      </div>
    )
  }
}
