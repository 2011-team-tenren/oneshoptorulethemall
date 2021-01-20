import React, {Component} from 'react'

export class GuestCart extends Component {
  componentDidMount() {
    console.log(localStorage)
  }

  render() {
    let retrievedOrder = localStorage.getItem('order')
    let order = Object.values(JSON.parse(retrievedOrder))
    console.log(order)
    return <div>Hello</div>
  }
}
