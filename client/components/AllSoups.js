import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllSoups} from '../store/allSoups'
import {Link} from 'react-router-dom'

export class AllSoups extends Component {
  componentDidMount() {
    this.props.fetchAllSoupsInReact()
  }

  render() {
    const imageStyle = {
      height: '20rem',
      width: 'auto'
    }

    const soupsInReact = this.props.soups.soups

    return (
      <div>
        {this.props.isAdmin ? <h1>Inventory</h1> : <h1>All Soups</h1>}
        {soupsInReact.map(soup => {
          const {id, name, quantity, imageUrl} = soup
          return (
            <div key={id}>
              <Link to={`soups/${soup.id}`}>
                <h2>
                  {name}: {quantity} cans in stock
                </h2>
                <img src={imageUrl} style={imageStyle} />
              </Link>
              {this.props.isAdmin ? (
                <button type="submit">Remove Soup From Stock</button>
              ) : (
                <button type="submit">Add to Cart</button>
              )}
            </div>
          )
        })}
      </div>
    )
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
