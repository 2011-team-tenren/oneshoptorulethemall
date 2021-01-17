import React, {Component} from 'react'
import {connect} from 'react-redux'
import AdminNewSoupForm from './AdminNewSoupForm'

export class AddNewSoup extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      flavor: '',
      quantity: 0,
      price: 0,
      imageUrl: ''
    }
  }

  render() {
    return (
      <div>
        <h1>New Soup Form</h1>
        <AdminNewSoupForm />
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
