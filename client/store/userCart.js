import axios from 'axios'

const setUserCart = usercart => {
  return {
    type: 'GET_USER_CART',
    usercart
  }
}

const editSoupQuantity = editedCart => {
  return {
    type: 'EDIT_SOUP_QUANTITY',
    editedCart
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

export const editQuantity = (soup_order, quantity) => {
  const orderId = soup_order.orderId
  const soupId = soup_order.soupId
  console.log(typeof quantity, quantity)

  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/orders/${orderId}/soups/${soupId}/quantity`,
        {
          quantity
        }
      )
      dispatch(editSoupQuantity(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeSoup = soup_order => {
  const orderId = soup_order.orderId
  const soupId = soup_order.soupId

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
    case 'EDIT_SOUP_QUANTITY':
      return {...state, ...action.editedCart}
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
