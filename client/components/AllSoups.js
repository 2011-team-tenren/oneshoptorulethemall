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

    const soups = [
      {
        id: 1,
        name: 'Campbells Chicken Noodle Soup',
        price: 6.0,
        ingredients: ['chicken', 'noodles', 'broth'],
        quantity: 1000,
        imageUrl:
          'https://www.campbellsoup.ca/wp-content/uploads/2020/04/Campbells_Warhol_040820-1-2048x1071.jpg'
      },
      {
        id: 2,
        name: 'Vegetable Soup',
        price: 6.0,
        ingredients: ['onion', 'celary', 'beans', 'broth'],
        quantity: 1000,
        imageUrl:
          'https://www.campbellsoup.ca/wp-content/uploads/2020/04/Campbells_Warhol_040820-1-2048x1071.jpg'
      }
    ]

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
              <ol>
                {ingredients.map(ingredient => {
                  return (
                    <li key={ingredients.indexOf(ingredient)}>{ingredient}</li>
                  )
                })}
              </ol>
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
