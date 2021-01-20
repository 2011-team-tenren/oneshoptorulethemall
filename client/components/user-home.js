import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="flex-container">
      <h3>Welcome, {email}</h3>
      <img src="https://i.pinimg.com/originals/4f/a9/cc/4fa9ccde0d43629a97b1029c4f65fbd7.png" />
      <p>All your favorite soups in one place</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
