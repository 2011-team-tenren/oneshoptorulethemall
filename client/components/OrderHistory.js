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
  }

  render() {
    const orderHistory = this.state.orderHistory
    return (
      <div>
        <h1>Your Order History:</h1>
        <section className="history-container">
          {orderHistory &&
            orderHistory.map(order => {
              let orderTotal = 0
              return (
                <div key={order.id}>
                  <h2>Order #{order.id + 1}</h2>
                  <div>
                    <ol className="order-item">
                      {order.soups.map(soup => {
                        orderTotal += soup.soup_order.price
                        return (
                          <div
                            key={order.soups.indexOf(soup)}
                            className="order-soup"
                          >
                            <Link to={`/soups/${soup.id}`}>
                              <li>
                                <p>
                                  {soup.name}: {soup.soup_order.quantity} units
                                </p>
                                <img src={soup.imageUrl} className="orderImg" />
                              </li>
                            </Link>
                          </div>
                        )
                      })}
                    </ol>
                    <h3 className="total">Order Total: ${orderTotal / 100}</h3>
                  </div>
                </div>
              )
            })}
        </section>
        {orderHistory.length === 0 ? (
          <Link to="/soups">
            <h1>Make your first order!</h1>
          </Link>
        ) : null}
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
