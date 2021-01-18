import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import AdminNewSoupForm from './AdminNewSoupForm'

const defaultState = {
  name: '',
  flavor: '',
  quantity: 0,
  price: 0,
  imageUrl: ''
}

export class AddNewSoup extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      await axios.post('/api/soups', this.state)
      this.setState(defaultState)
    } catch (err) {
      console.log(err)
    }
  }

  async handleChange(event) {
    await this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
        <h1>New Soup Form</h1>
        <AdminNewSoupForm
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewSoup)
