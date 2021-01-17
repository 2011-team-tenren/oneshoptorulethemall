import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserCart, removeSoup, editQuantity} from '../store/userCart'
import {Link} from 'react-router-dom'

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
    editQuantityInReact: (soup_order, quantity) =>
      dispatch(editQuantity(soup_order, quantity)),
    removeSoupInReact: soup_order => dispatch(removeSoup(soup_order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
