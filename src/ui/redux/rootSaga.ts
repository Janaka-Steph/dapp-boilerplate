/**
 * Effects
 */
import {all, call, fork, put, race, take} from 'redux-saga/lib/effects.js'
import {watchGetBlockNumber} from './ethereum/ethereumSaga'
import rps from './rps/rpsSaga'
import user, {watchDefaultAccountChange} from './user/userSaga'

function* bootstrap() {
  console.log('bootstrap sagas')
  yield put({type: 'USER_ACCOUNTS_REQUESTED'})
  yield put({type: 'FETCH_ETHEREUM_INFO_REQUESTED'})
  yield put({type: 'FETCH_CONTRACTS_INFO_REQUESTED'})
  const { error } = yield race({
    success: take('FETCH_CONTRACTS_INFO_SUCCEED'),
    error: take('FETCH_CONTRACTS_INFO_FAILED'),
  })
  if (error) throw new Error(error)
  yield put({type: 'FETCH_OWNER_ADDRESS_REQUESTED'})
}

/******************************************************************************/
/******************************* ROOT SAGA ************************************/
/******************************************************************************/
export default function* rootSaga() {
  yield all([
    // Common
    fork(watchGetBlockNumber),
    fork(user),
    fork(bootstrap),
    //call(watchDefaultAccountChange),
    // Others
    call(rps),
  ])
}