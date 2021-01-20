import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllSoups} from '../store/allSoups'
import {Link} from 'react-router-dom'
import axios from 'axios'

export class AllSoups extends Component {
  constructor() {
    super()
    this.removeSoup = this.removeSoup.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllSoupsInReact()
  }

  async removeSoup(evt) {
    evt.preventDefault()
    try {
      const soupId = evt.target.name
      await axios.delete(`/api/soups/${soupId}`)
      this.props.fetchAllSoupsInReact()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    // const imageStyle = {
    //   height: '20rem',
    //   width: 'auto',
    // }

    const soupsInReact = this.props.soups.soups

    if (soupsInReact.length > 0) {
      return (
        <div>
          {this.props.isAdmin ? <h1>Inventory</h1> : <h1>All Soups</h1>}
          <section className="soup-container">
            {soupsInReact.map(soup => {
              const {id, name, quantity, imageUrl} = soup
              return (
                <div key={id} className="soup-item">
                  <Link to={`soups/${soup.id}`}>
                    <h2>
                      {name} : {quantity} cans in stock
                    </h2>
                    <img src={imageUrl} className="allSoups" />
                  </Link>
                  {this.props.isAdmin ? (
                    <button
                      type="submit"
                      name={soup.id}
                      onClick={this.removeSoup}
                    >
                      Remove Soup From Stock
                    </button>
                  ) : null}
                </div>
              )
            })}
          </section>
        </div>
      )
    } else {
      return <h1>There Are No Soups In Stock</h1>
    }
  }
}

const mapStateToProps = state => {
  return {
    soups: state.soups,
    isAdmin: state.user.access
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSoupsInReact: () => dispatch(fetchAllSoups())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSoups)
