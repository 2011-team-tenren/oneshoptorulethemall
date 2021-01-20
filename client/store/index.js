import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import soupReducer from './allSoups'
import singleSoupReducer from './singleSoup'
import userCartReducer from './userCart'
import allUsersReducer from './allUsers'

const reducer = combineReducers({
  user,
  soups: soupReducer,
  soup: singleSoupReducer,
  usercart: userCartReducer,
  users: allUsersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
