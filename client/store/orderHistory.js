import axios from 'axios'

const setOrderHistory = orderHistory => {
  return {
    type: 'GET_ORDER_HISTORY',
    orderHistory
  }
}

export const fetchOrderHistory = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/user/${userId}`)
      dispatch(setOrderHistory(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {
  orderHistory: []
}

export default function orderHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ORDER_HISTORY':
      return {...state, orderHistory: action.orderHistory}
    default:
      return state
  }
}
