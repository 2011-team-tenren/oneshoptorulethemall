import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  fetchUserCart,
  removeSoup,
  checkoutUserCart,
  editQuantity
} from '../store/userCart'
import {Link} from 'react-router-dom'
import UserConfirmation from './user-confirmation'
import UserEmpty from './user-empty'

export class UserCart extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeSoup = this.removeSoup.bind(this)
  }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.userId
      await this.props.fetchUserCartInReact(userId)
    } catch (err) {
      console.log(err)
    }
  }

  async handleSubmit(event, soup_order) {
    event.preventDefault()
    let quantity = parseInt(event.target.quantity.value)
    console.log(typeof quantity)
    try {
      !quantity
        ? this.removeSoup(soup_order)
        : this.props.editQuantityInReact(soup_order, quantity)
      console.log()
    } catch (err) {
      console.log(err)
    }
  }

  removeSoup(soup_order) {
    this.props.removeSoupInReact(soup_order)
  }

  async checkoutUserCart(userId) {
    await this.props.checkoutUserCartInReact(userId)
    await this.props.fetchUserCartInReact(userId)
    alert(' Your order has been placed.  Please check your email')
  }

  render() {
    const imageStyle = {
      height: '20rem',
      width: 'auto'
    }
    //console.log('is the cart full?', userCart.soups.length)

    //const isCart = this.state.isCart

    //  there are three differnt scenarios to this component.  1.empty cart "Please check out our All Soups"
    // 2. before checkout Lists all soups in cart and has a checkout button.  3. After Checkout renders user-confirmation
    //4. if the user goes back to myCart, a fresh empty cart is available.
    const userCart = this.props.usercart
    const userId = this.props.match.params.userId
    return (
      <div>
        <h1>Soups in my Cart</h1>
        {userCart.soups && userCart.soups.length ? (
          userCart.soups.map(soup => {
            const {id, name, imageUrl, soup_order} = soup
            return (
              <div key={id}>
                <Link to={`soups/${id}`}>
                  <h2>Name: {name}</h2>
                  <h2>Quantity: {soup_order.quantity}</h2>
                  <h2>Total: ${soup_order.price / 100}</h2>
                  <img src={imageUrl} style={imageStyle} />
                </Link>

                <div>
                  <div>Edit Quantity: </div>
                  <form
                    onSubmit={event => this.handleSubmit(event, soup_order)}
                  >
                    <label htmlFor="quantity" />
                    <input
                      type="number"
                      min="0"
                      max="30"
                      name="quantity"
                      defaultValue={soup_order.quantity}
                    />
                    <button type="submit">Submit</button>
                  </form>
                </div>
                <button onClick={() => this.removeSoup(soup_order)}>
                  Remove
                </button>
              </div>
            )
          })
        ) : (
          <div>
            <UserEmpty />
          </div>
        )}
        <button type="submit" onClick={() => this.checkoutUserCart(userId)}>
          Would You like to Checkout?
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usercart: state.usercart
  }
}
// this.props.usercart.usercart
const mapDispatchToProps = dispatch => {
  return {
    fetchUserCartInReact: userId => dispatch(fetchUserCart(userId)),

    checkoutUserCartInReact: userId => dispatch(checkoutUserCart(userId)),
    editQuantityInReact: (soup_order, quantity) =>
      dispatch(editQuantity(soup_order, quantity)),
    removeSoupInReact: soup_order => dispatch(removeSoup(soup_order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
