import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserCart, removeSoup} from '../store/userCart'
import {Link} from 'react-router-dom'

export class UserCart extends Component {
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

  render() {
    const imageStyle = {
      height: '20rem',
      width: 'auto'
    }

    const userCart = this.props.usercart

    return (
      <div>
        <h1>Soups in my Cart</h1>
        {userCart.soups &&
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
                  onClick={() =>
                    this.removeSoup(soup_order.soupId, soup_order.orderId)
                  }
                >
                  Remove
                </button>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usercart: state.usercart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCartInReact: userId => dispatch(fetchUserCart(userId)),
    removeSoupInReact: (soupId, orderId) =>
      dispatch(removeSoup(soupId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
