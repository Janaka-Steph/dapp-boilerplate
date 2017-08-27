const initialState = {
  errors: [],
  txs: [],
}

// For transactions
const createTxActionHandlers = (actionName) => {
  return {
    // Keep the tx id in Redux store and optional values
    [`${actionName}_SUCCEED`]: (state, action: {tx: string, values?: object}) => {
      const {values, tx} = action
      const txLog = {event: `${actionName}_SUCCEED`, tx}
      const txs = [...state.txs, txLog]
      return {...state, txs, ...values}
    },
    // Keep the error in Redux store
    [`${actionName}_FAILED`]: (state, action: {e: string}) => {
      const errorLog = {event: `${actionName}_FAILED`, message: action.e}
      const errors = [...state.errors, errorLog]
      return {...state, errors}
    }
  }
}

// For constant functions
const createCallActionHandlers = (actionName) => {
  return {
    [`${actionName}_SUCCEED`]: (state, action: {values: object}) => {
      const {values} = action
      return {...state, ...values}
    },
    [`${actionName}_FAILED`]: (state, action: {e: string}) => {
      const errorLog = {event: `${actionName}_FAILED`, message: action.e}
      const errors = [...state.errors, errorLog]
      return {...state, errors}
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    ...createTxActionHandlers('TX_RPS_DEPLOY_SUBMISSION'),
    ...createTxActionHandlers('TX_MOVE_SUBMISSION'),
    ...createTxActionHandlers('TX_SOLVE_SUBMISSION'),
    ...createCallActionHandlers('GENERATE_HASH_SUBMISSION')
}
// ------------------------------------
// Reducer
// ------------------------------------
export default function rpsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
