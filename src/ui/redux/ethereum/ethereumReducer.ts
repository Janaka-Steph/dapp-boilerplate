import * as update from 'immutability-helper'

const initialState = {
  blockNumber: null,
  contracts: {},
  network: null
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['BLOCK_NUMBER_SUCCEED']: (state, action) => {
    return  {...state, blockNumber: action.blockNumber}
  },
  ['BLOCK_NUMBER_FAILED']: (state, action) => {
    return  {...state, errorMessage: action.errorMessage}
  },
  ['FETCH_CONTRACTS_INFO_SUCCEED']: (state, action) => {
    return {...state, contracts: action.contractsInfo}
  },
  ['FETCH_CONTRACTS_INFO_FAILED']: (state, action) => {
    return {...state, error: action.error}
  },
  ['FETCH_NETWORK_ID_SUCCEED']: (state, action) => {
    return  {...state, network: action.network}
  },
  ['FETCH_NETWORK_ID_FAILED']: (state, action) => {
    return  {...state, errorMessage: action.errorMessage}
  },
  ['UPDATE_RPS_CONTRACT_ADDR_SUCCEED']: (state, action) => {
    const {values} = action
    return update(state, values)
  },
  ['UPDATE_RPS_CONTRACT_ADDR_FAILED']: (state, action: {e: string}) => {
    const errorLog = {event: `UPDATE_RPS_CONTRACT_ADDR_FAILED`, message: action.e}
    const errors = [...state.errors, errorLog]
    return {...state, errors}
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function ethereumReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}