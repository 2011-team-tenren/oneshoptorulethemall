import axios from 'axios'

const getSoup = soup => {
  return {
    type: 'GET_SOUP',
    soup
  }
}

export const updateOrder = (soupId, userId, qty) => {
  return async dispatch => {
    try {
      const user = await axios.get(`/api/users/${userId}`)

      const {data} = await axios.put(
        `/api/orders/${user.data.orders[0].id}/soups/${soupId}`,
        {quantity: qty}
      )
    } catch (error) {
      console.error(error)
    }
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
