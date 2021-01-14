import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSoup} from '../store/singleSoup'

export class SingleSoup extends Component {
  async componentDidMount() {
    try {
      const soupId = this.props.match.params.soupId
      await this.props.fetchSoupInReact(soupId)
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

    return (
      <div>
        <h1>All Soups</h1>
        <h2>
          {soupInReact.name}: {soupInReact.price}
        </h2>
        <h3>Flavor: {soupInReact.flavor}</h3>
        <img src={soupInReact.imageUrl} style={imageStyle} />
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
  }
}

const mapStateToProps = state => {
  return {
    soup: state.soup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSoupInReact: id => dispatch(fetchSoup(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleSoup)
