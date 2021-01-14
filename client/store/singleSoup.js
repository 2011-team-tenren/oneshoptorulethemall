import axios from 'axios'

const getSoup = soup => {
  return {
    type: 'GET_SOUP',
    soup
  }
}

export const fetchSoup = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/soups/${id}`)
      dispatch(getSoup(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  soup: {}
}

export default function singleSoupReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_SOUP':
      return {...state, soup: action.soup}
    default:
      return state
  }
}
