import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {fetchAllSoups} from '../store/allSoups'

export class SingleSoup extends Component {
  async componentDidMount() {
    // try {
    //   const soupId = this.props.match.params.soupId
    //   await this.props.fetchSingleSoupInReact(soupId)
    //   this.setState(this.props.singleSoup.singleSoup[0])
    // } catch (err) {
    //   console.log(err)
    // }
  }

  render() {
    const imageStyle = {
      height: '20rem',
      width: 'auto'
    }

    // const soupsInReact = this.props.soups.soups
    const singleSoup = [
      {
        id: 1,
        name: 'Campbells Chicken Noodle Soup',
        price: 6.0,
        ingredients: ['chicken', 'noodles', 'broth'],
        quantity: 1000,
        imageUrl:
          'https://www.campbellsoup.ca/wp-content/uploads/2020/04/Campbells_Warhol_040820-1-2048x1071.jpg'
      }
    ]

    return (
      <div>
        <h1>All Soups</h1>
        {singleSoup.map(soup => {
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
              <select name="qty" id="qty">
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
    // singleSoup: state.singleSoup,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchSingleSoupInReact: (id) => dispatch(fetchSingleSoup(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleSoup)
