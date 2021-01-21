import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/orderHistory'
import Axios from 'axios'
import {Link} from 'react-router-dom'

export class OrderHistory extends Component {
  constructor() {
    super()
    this.state = {orderHistory: []}
  }

  async componentDidMount() {
    const userId = this.props.match.params.userId

    try {
      const {data} = await Axios.get(`/api/orders/user/${userId}`)
      this.setState({orderHistory: data})
    } catch (err) {
      console.log(err)
    }

    // this.props.fetchOrderHistoryInReact(userId)
    // console.log(store.getState())
    // console.log(this.state.orderHistory)
  }

  render() {
    const imageStyle = {
      height: '10rem',
      width: 'auto'
    }

    const orderHistory = this.state.orderHistory
    return (
      <div>
        <h1>Your Order History:</h1>
        {orderHistory &&
          orderHistory.map(order => {
            let orderTotal = 0
            return (
              <div key={order.id}>
                <h2>Order #{order.id + 1}</h2>
                <ol>
                  {order.soups.map(soup => {
                    orderTotal += soup.soup_order.price
                    return (
                      <div key={order.soups.indexOf(soup)}>
                        <Link to={`/soups/${soup.id}`}>
                          <li>
                            <p>
                              {soup.name}: {soup.soup_order.quantity} units
                            </p>
                            <img src={soup.imageUrl} style={imageStyle} />
                          </li>
                        </Link>
                      </div>
                    )
                  })}
                </ol>
                <h3>Order Total: ${orderTotal / 100}</h3>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    orderHistory: state.orderHistory,
    isAdmin: state.user.access
  }
}

const mapDispatchToProps = dispatch => {
  console.log(dispatch)
  return {
    fetchOrderHistoryInReact: userId => dispatch(fetchOrderHistory(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
