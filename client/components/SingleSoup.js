import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSoup, updateOrder} from '../store/singleSoup'
import AdminForm from './AdminSingleSoupForm'

export class SingleSoup extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      editQty: 0,
      editPrice: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.removeSoup = this.removeSoup.bind(this)
  }
  async componentDidMount() {
    try {
      const soupId = this.props.match.params.soupId
      await this.props.fetchSoupInReact(soupId)
      if (this.props.soup.soups) {
        this.setState({
          editQty: this.props.soup.soup.quantity,
          editPrice: this.props.soup.soup.price
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  async handleChange(event) {
    await this.setState({[event.target.name]: event.target.value})
  }

  handleClick(soupId, userId, quantity, soup, flavor, event) {
    event.preventDefault()
    alert('Item added to cart!')
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
      let stringOrder = JSON.stringify(retrievedOrder)
      localStorage.setItem('order', stringOrder)
    }
  }

  async handleEdit(evt) {
    evt.preventDefault()
    try {
      const soupId = this.props.match.params.soupId
      await axios.put(`/api/soups/${soupId}`, {
        quantity: this.state.editQty,
        price: this.state.editPrice
      })
      this.props.fetchSoupInReact(soupId)
    } catch (err) {
      console.log(err)
    }
  }

  async removeSoup(evt) {
    evt.preventDefault()
    try {
      const soupId = this.props.match.params.soupId
      await axios.delete(`/api/soups/${soupId}`)
      this.props.fetchSoupInReact(soupId)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const imageStyle = {
      height: '20rem',
      width: 'auto'
    }

    const soupInReact = this.props.soup.soup

    if (soupInReact) {
      return (
        <div className="single-soup-container">
          <section>
            {this.props.isAdmin ? <h1>Edit Soup</h1> : null}
            <h2>
              {soupInReact.name}: ${soupInReact.price / 100}
            </h2>
            {this.props.isAdmin ? (
              <h2>{soupInReact.quantity} cans in stock</h2>
            ) : null}
            <h3>Flavor: {soupInReact.flavor}</h3>
            <img src={soupInReact.imageUrl} className="single-soup-img" />
            {this.props.isAdmin ? (
              <AdminForm
                editQty={this.state.editQty}
                editPrice={this.state.editPrice}
                handleChange={this.handleChange}
                handleEdit={this.handleEdit}
                removeSoup={this.removeSoup}
              />
            ) : (
              <div>
                <select
                  name="quantity"
                  id="quantity"
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
                  className="addToCart"
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
            )}
          </section>
        </div>
      )
    } else {
      return (
        <div>
          <h1>This Soup Has Been Removed From The Store</h1>
          <Link to="/soups">View All Soups In Store</Link>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    soup: state.soup,
    userId: state.user.id,
    isAdmin: state.user.access
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
