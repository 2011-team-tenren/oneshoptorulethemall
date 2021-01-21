import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {id, email} = props

  return (
    <div className="flex-container">
      <h3>Welcome, {email}</h3>
      <Link to={`/orderhistory/${id}`}>
        <h4>View your order history</h4>
      </Link>
      <img
        width="300"
        height="300"
        src="https://lh3.googleusercontent.com/XBdzhXfWR6UTe6Dj0SeyJH3RgUeKFpSm4u5be14RLk5C7KmCt-_ytmg0vGsRfowfH2jfxmArzrnVxsT-Gw5WksKRDv46PqxjdGax7TsC-pH8mzkvVanAcLBnfVEw_iMurRAMPPHoSQ=w2400"
      />
      <p>All your favorite soups in one place</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
