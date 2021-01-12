import axios from 'axios'

const setAllSoups = soups => {
  return {
    type: 'GET_ALL_SOUPS',
    soups
  }
}

const fetchAllSoups = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('api/soups')
      dispatch(setAllSoups(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  soups: []
}

export default function soupReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_SOUPS':
      return {...state, soups: action.soups}
    default:
      return state
  }
}
