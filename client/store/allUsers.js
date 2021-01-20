import axios from 'axios'

const setAllUsers = users => {
  return {
    type: 'GET_ALL_USERS',
    users
  }
}

export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('api/users')
      dispatch(setAllUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  users: []
}

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return {...state, users: action.users}
    default:
      return state
  }
}
