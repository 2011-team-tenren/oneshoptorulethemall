import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllSoups} from '../store/allSoups'

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
        <h1>All Soups</h1>
        {soupsInReact.map(soup => {
          console.log(soup)
          const {id, name, price, ingredients, imageUrl} = soup
          return (
            <div key={id}>
              <h2>
                {name}: ${price} per can
              </h2>
              <h3>Ingredients</h3>
              <img src={imageUrl} style={imageStyle} />
              <button type="submit">Add to Cart</button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    soups: state.soups
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSoupsInReact: () => dispatch(fetchAllSoups())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSoups)
