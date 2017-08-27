// ========================================================
// RPS Sagas
// ========================================================
import {call, put, select, takeEvery} from 'redux-saga/lib/effects.js'
import waitForMined from '../../helpers/waitForMined'
import {contracts} from '../../blockchainConnect'
// ========================================================
// RPS Deploy submission
// ========================================================
let onRPSDeploySubmit = (c1Hash, addrPlayerTwo, stake) => {
  const {RPS}: any = contracts
  return RPS.new(c1Hash, addrPlayerTwo, {from: window.web3.eth.defaultAccount, gas: 4000000, value: web3.toWei(stake, 'ether')})
}
function* onRPSDeploySubmitWorker(action) {
  try {
    const {c1Hash, addrPlayerTwo, stake} = action.values
    window.RPSInstance = yield call(onRPSDeploySubmit, c1Hash, addrPlayerTwo, stake)
    yield call(waitForMined, window.RPSInstance.transactionHash, 'onRPSDeploySubmit') // setInterval until mined
    yield put({type: 'TX_RPS_DEPLOY_SUBMISSION_SUCCEED', tx: window.RPSInstance.transactionHash, values: {c1Hash, addrPlayerTwo}})
    // Update player's balances
    yield put({type: 'USER_BALANCE_REQUESTED'})
    yield put({type: 'P2_BALANCE_REQUESTED'})
  } catch (e) {
    yield put({type: 'TX_RPS_DEPLOY_SUBMISSION_FAILED', e: e.message})
  }
}
// ========================================================
// P2 Move submission
// ========================================================
let onMoveSubmit = (move, addrPlayerTwo, stake) => {
  return window.RPSInstance.play.sendTransaction(move, {from: addrPlayerTwo, gas: 1000000, value: web3.toWei(stake, 'ether')})
}
function* onMoveSubmitWorker(action) {
  try {
    const {move, stake} = action.values
    const addrPlayerTwo = yield select((s) => s.rps.addrPlayerTwo)
    const tx = yield call(onMoveSubmit, move, addrPlayerTwo, stake)
    yield call(waitForMined, tx, 'onMoveSubmit') // setInterval until mined
    yield put({type: 'TX_MOVE_SUBMISSION_SUCCEED', tx})
    // Update player 2 balance
    yield put({type: 'P2_BALANCE_REQUESTED'})
  } catch (e) {
    yield put({type: 'TX_MOVE_SUBMISSION_FAILED', e: e.message})
  }
}
// ========================================================
// Solve submission
// ========================================================
let onSolveSubmit = (move, salt) => {
  return window.RPSInstance.solve.sendTransaction(Number(move), Number(salt), {from: window.web3.eth.defaultAccount, gas: 1000000})
}
function* onSolveSubmitWorker(action) {
  try {
    const {move, salt} = action.values
    const tx = yield call(onSolveSubmit, move, salt)
    yield call(waitForMined, tx, 'onSolveSubmit') // setInterval until mined
    yield put({type: 'TX_SOLVE_SUBMISSION_SUCCEED', tx})
    // Update player's balances
    yield put({type: 'USER_BALANCE_REQUESTED'})
    yield put({type: 'P2_BALANCE_REQUESTED'})
  } catch (e) {
    yield put({type: 'TX_SOLVE_SUBMISSION_FAILED', e: e.message})
  }
}
// ========================================================
// On generate hash submission
// ========================================================
let onGenerateHash = (move, salt) => {
  const {Hasher}: any = contracts
  return Hasher.hash(move, salt)
}
function* onGenerateHashWorker(action) {
  try {
    const {move, salt} = action.values
    const hash = yield call(onGenerateHash, move, salt)
    yield put({type: 'GENERATE_HASH_SUBMISSION_SUCCEED', values: {hash}})
  } catch (e) {
    yield put({type: 'GENERATE_HASH_SUBMISSION_FAILED', e: e.message})
  }
}
// ========================================================
// Watch RPS saga
// ========================================================
export default function* rps() {
  yield takeEvery('TX_RPS_DEPLOY_SUBMISSION_REQUESTED', onRPSDeploySubmitWorker)
  yield takeEvery('TX_MOVE_SUBMISSION_REQUESTED', onMoveSubmitWorker)
  yield takeEvery('TX_SOLVE_SUBMISSION_REQUESTED', onSolveSubmitWorker)
  yield takeEvery('GENERATE_HASH_SUBMISSION_REQUESTED', onGenerateHashWorker)
}