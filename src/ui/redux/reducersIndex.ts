import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import ethereumReducer from './ethereum/ethereumReducer'
import rpsReducer from './rps/rpsReducer'
import userReducer from './user/userReducer'

/***************************** App State **************************************
- ethereum - Technical info about the Ethereum blockchain
 - blockNumber
 - numberOfPeers

- dao - Useful info for dao admin
 - ownerAddress
 - contract

- user
  - address
  - balance
*/

export const makeRootReducer = (asyncReducers = null) => {
  return combineReducers({
    ethereum: ethereumReducer,
    form: formReducer,
    routing: routerReducer,
    rps: rpsReducer,
    user: userReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer