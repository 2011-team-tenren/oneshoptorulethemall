import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/orderHistory'
import store from '../store'
import Axios from 'axios'

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
    console.log(this.props)
  }

  render() {
    console.log(this.state)
    return <div>HISTORY</div>
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
