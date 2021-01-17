import axios from 'axios'

const setUserCart = usercart => {
  return {
    type: 'GET_USER_CART',
    usercart
  }
}

const removeSoupFromCart = soupId => {
  return {
    type: 'REMOVE_SOUP_FROM_CART',
    soupId
  }
}

export const fetchUserCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/order`)
      dispatch(setUserCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeSoup = (soupId, orderId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orders/${orderId}/soups/${soupId}`)
      dispatch(removeSoupFromCart(soupId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const checkoutUserCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}/checkout`)
      await dispatch(setUserCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  usercart: {}
}

export default function userCartReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER_CART':
      return {...state, ...action.usercart}
    case 'REMOVE_SOUP_FROM_CART':
      const updatedCart = state.soups.filter(soup => soup.id !== action.soupId)
      return {
        ...state,
        soups: updatedCart
      }
    default:
      return state
  }
}
