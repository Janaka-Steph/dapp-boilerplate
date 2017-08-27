const initialState = {
  accounts: [],
  balance: null,
  p2balance: null,
  defaultAccount: null,
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['USER_ACCOUNTS_SUCCEED']: (state, action) => {
    return {...state, accounts: action.accounts}
  },
  ['USER_ACCOUNTS_FAILED']: (state, action) => {
    return {...state, error: action.e}
  },
  ['USER_DEFAULT_ACCOUNT_SUCCEED']: (state, action) => {
    return {...state, defaultAccount: action.defaultAccount}
  },
  ['USER_DEFAULT_ACCOUNT_FAILED']: (state, action) => {
    return {...state, error: action.e}
  },
  ['USER_BALANCE_SUCCEED']: (state, action) => {
    return {...state, balance: action.balance}
  },
  ['USER_BALANCE_FAILED']: (state, action) => {
    return {...state, error: action.e}
  },
  ['P2_BALANCE_SUCCEED']: (state, action) => {
  return {...state, p2balance: action.p2balance}
  },
  ['P2_BALANCE_FAILED']: (state, action) => {
  return {...state, error: action.e}
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}