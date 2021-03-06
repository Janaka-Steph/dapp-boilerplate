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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function ethereumReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}