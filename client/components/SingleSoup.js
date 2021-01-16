import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSoup, updateOrder} from '../store/singleSoup'

export class SingleSoup extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    try {
      const soupId = this.props.match.params.soupId
      await this.props.fetchSoupInReact(soupId)
    } catch (err) {
      console.log(err)
    }
  }
  async handleChange(event) {
    await this.setState({quantity: event.target.value})
  }

  handleClick(soupId, userId, quantity, soup, flavor, event) {
    event.preventDefault()
    if (this.props.userId) {
      this.props.addToOrder(soupId, userId, quantity)
    } else if (!localStorage.getItem('order')) {
        let order = {}
        let stringOrder = JSON.stringify(order)
        localStorage.setItem('order', stringOrder)
      } else {
        let soupWQty = {...soup, orderQuantity: quantity}
        let retrievedOrder = JSON.parse(localStorage.getItem('order'))
        retrievedOrder = {...retrievedOrder, [flavor]: soupWQty}
        console.log('order', retrievedOrder)
        let stringOrder = JSON.stringify(retrievedOrder)
        localStorage.setItem('order', stringOrder)
      }
  }

  render() {
    const imageStyle = {
      height: '20rem',
      width: 'auto'
    }

    const soupInReact = this.props.soup.soup

    return (
      <div>
        <h2>
          {soupInReact.name}: ${soupInReact.price / 100}
        </h2>
        <h3>Flavor: {soupInReact.flavor}</h3>
        <img src={soupInReact.imageUrl} style={imageStyle} />
        <select
          name="qty"
          id="qty"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
        </select>
        <button
          type="submit"
          onClick={() => {
            if (this.props.userId) {
              this.handleClick(
                soupInReact.id,
                this.props.userId,
                this.state.quantity,
                null,
                null,
                event
              )
            } else {
              this.handleClick(
                null,
                null,
                this.state.quantity,
                soupInReact,
                soupInReact.flavor,
                event
              )
            }
          }}
        >
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    soup: state.soup,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSoupInReact: id => dispatch(fetchSoup(id)),
    addToOrder: (soupId, userId, quantity) =>
      dispatch(updateOrder(soupId, userId, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleSoup)
