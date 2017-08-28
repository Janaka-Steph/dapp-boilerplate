// ========================================================
// RPS Sagas
// ========================================================
import {delay} from 'redux-saga'
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
    const RPSInstance = yield call(onRPSDeploySubmit, c1Hash, addrPlayerTwo, stake)
    yield call(waitForMined, RPSInstance.transactionHash, 'onRPSDeploySubmit')
    yield put({type: 'TX_RPS_DEPLOY_SUBMISSION_SUCCEED', tx: RPSInstance.transactionHash, values: {c1Hash, addrPlayerTwo}})
    // Update RPS contract address
    yield put({type: 'UPDATE_RPS_CONTRACT_ADDR_SUCCEED', values: {contracts: {$merge: {RPS: {address: RPSInstance.address}}}}})
    // Update player's balances
    yield delay(5000)
    yield put({type: 'USER_BALANCE_REQUESTED'})
    yield put({type: 'P2_BALANCE_REQUESTED'})
  } catch (e) {
    yield put({type: 'TX_RPS_DEPLOY_SUBMISSION_FAILED', e: e.message})
  }
}
// ========================================================
// P2 Move submission
// ========================================================
let onMoveSubmit = (RPSAddress, move, addrPlayerTwo, stake) => {
  const {RPS}: any = contracts
  return RPS.at(RPSAddress).play.sendTransaction(move, {from: addrPlayerTwo, gas: 1000000, value: web3.toWei(stake, 'ether')})
}
function* onMoveSubmitWorker(action) {
  try {
    const {move, stake} = action.values
    const addrPlayerTwo = yield select((s) => s.rps.addrPlayerTwo)
    const RPSAddress = yield select((s) => s.ethereum.contracts.RPS.address)
    const tx = yield call(onMoveSubmit, RPSAddress, move, addrPlayerTwo, stake)
    yield call(waitForMined, tx, 'onMoveSubmit') // setInterval until mined
    yield put({type: 'TX_MOVE_SUBMISSION_SUCCEED', tx})
    // Update player 2 balance
    yield delay(5000)
    yield put({type: 'P2_BALANCE_REQUESTED'})
  } catch (e) {
    yield put({type: 'TX_MOVE_SUBMISSION_FAILED', e: e.message})
  }
}
// ========================================================
// Solve submission
// ========================================================
let onSolveSubmit = (RPSAddress, move, salt) => {
  const {RPS}: any = contracts
  return RPS.at(RPSAddress).solve.sendTransaction(Number(move), Number(salt), {from: window.web3.eth.defaultAccount, gas: 1000000})
}
function* onSolveSubmitWorker(action) {
  try {
    const {move, salt} = action.values
    const RPSAddress = yield select((s) => s.ethereum.contracts.RPS.address)
    const tx = yield call(onSolveSubmit, RPSAddress, move, salt)
    yield call(waitForMined, tx, 'onSolveSubmit') // setInterval until mined
    yield put({type: 'TX_SOLVE_SUBMISSION_SUCCEED', tx})
    // Update player's balances
    yield delay(5000)
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
// Timeout submission - Triggered by P2
// ========================================================
let onP1Timeout = (RPSAddress, addrPlayerTwo) => {
  const {RPS}: any = contracts
  return RPS.at(RPSAddress).j1Timeout.sendTransaction({from: addrPlayerTwo, gas: 4000000})
}
function* onP1TimeoutWorker() {
  try {
    const addrPlayerTwo = yield select((s) => s.rps.addrPlayerTwo)
    const RPSAddress = yield select((s) => s.ethereum.contracts.RPS.address)
    const tx = yield call(onP1Timeout, RPSAddress, addrPlayerTwo)
    yield call(waitForMined, tx, 'onP1Timeout')
    yield put({type: 'TX_P1_TIMEOUT_SUBMISSION_SUCCEED', tx})
    // Update player 2 balance
    yield delay(5000)
    yield put({type: 'P2_BALANCE_REQUESTED'})
  } catch (e) {
    yield put({type: 'TX_P1_TIMEOUT_SUBMISSION_FAILED', e: e.message})
  }
}
// ========================================================
// Timeout submission - Triggered by P1
// ========================================================
let onP2Timeout = (RPSAddress) => {
  const {RPS}: any = contracts
  return RPS.at(RPSAddress).j2Timeout.sendTransaction({from: window.web3.eth.defaultAccount, gas: 4000000})
}
function* onP2TimeoutWorker() {
  try {
    const RPSAddress = yield select((s) => s.ethereum.contracts.RPS.address)
    const tx = yield call(onP2Timeout, RPSAddress)
    yield call(waitForMined, tx, 'onP2Timeout')
    yield put({type: 'TX_P2_TIMEOUT_SUBMISSION_SUCCEED', tx})
    // Update player 1 balance
    yield delay(5000)
    yield put({type: 'USER_BALANCE_REQUESTED'})
  } catch (e) {
    yield put({type: 'TX_P2_TIMEOUT_SUBMISSION_FAILED', e: e.message})
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
  yield takeEvery('TX_P1_TIMEOUT_SUBMISSION_REQUESTED', onP1TimeoutWorker)
  yield takeEvery('TX_P2_TIMEOUT_SUBMISSION_REQUESTED', onP2TimeoutWorker)
}