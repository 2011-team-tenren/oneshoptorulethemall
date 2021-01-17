import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserCart, removeSoup, checkoutUserCart} from '../store/userCart'
import {Link} from 'react-router-dom'
import UserConfirmation from './user-confirmation'
import UserEmpty from './user-empty'

export class UserCart extends Component {
  constructor(props) {
    super(props)
    this.beforeCheckout = this.beforeCheckout.bind(this)
    this.afterCheckout = this.afterCheckout.bind(this)
    this.state = {
      //isCart: true,
      checkoutButtonClicked: true
    }
  }
  beforeCheckout() {
    this.setState = {isCart: true}
  }
  afterCheckout() {
    this.setState = {isCart: false}
  }
  async componentDidMount() {
    try {
      const userId = this.props.match.params.userId
      await this.props.fetchUserCartInReact(userId)
    } catch (err) {
      console.log(err)
    }
  }

  removeSoup(soupId, orderId) {
    this.props.removeSoupInReact(soupId, orderId)
  }

  checkoutUserCart(userId) {
    this.props.checkoutUserCartInReact(userId)
    //this.setState = {checkoutButtonClicked: true}
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
                <button
                  type="submit"
                  onClick={() =>
                    this.removeSoup(soup_order.soupId, soup_order.orderId)
                  }
                >
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
        {this.state.checkoutButtonClicked ? (
          <div>
            <UserConfirmation />
          </div>
        ) : null}
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
    removeSoupInReact: (soupId, orderId) =>
      dispatch(removeSoup(soupId, orderId)),
    checkoutUserCartInReact: userId => dispatch(checkoutUserCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
