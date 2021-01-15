import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllSoups} from '../store/allSoups'
import {Link} from 'react-router-dom'

export class Admin extends Component {
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
          const {id, name, price, imageUrl} = soup
          return (
            <div key={id}>
              <Link to={`soups/${soup.id}`}>
                <h2>
                  {name}: ${price / 100} per can
                </h2>
                <img src={imageUrl} style={imageStyle} />
              </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
