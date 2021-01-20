import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'

export class AdminAllUsers extends Component {
  componentDidMount() {
    this.props.fetchAllUsersInReact()
  }
  render() {
    const usersInReact = this.props.users.users
    console.log('props props props ', this.props)
    if (usersInReact && usersInReact.length > 0) {
      return (
        <div>
          {this.props.isAdmin ? (
            <h1>All Users</h1>
          ) : (
            <h1>Not logged in as admin!</h1>
          )}
          {usersInReact.map(user => {
            const {id, email, orders} = user
            return (
              <div key={id}>
                <ul>{email}</ul>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <h1>We do not have users </h1>
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    isAdmin: state.user.access
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsersInReact: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAllUsers)
