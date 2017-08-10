import {contracts} from '../../blockchainConnect'
import {call, put, takeEvery} from 'redux-saga/lib/effects.js'
// ========================================================
// Get Ethereum current block number
// ========================================================
let getBlockNumber = () => {
  return new Promise((resolve, reject) => {
    window.web3.eth.getBlockNumber((e, r) => !e ? resolve(r) : reject(e))
  })
}
// ========================================================
// Get Ethereum network
// ========================================================
let getNetwork = () => {
  return new Promise((resolve, reject) => {
    window.web3.version.getNetwork((e, r) => {
      if (e) reject(e)
      if (r === '1') resolve('Main net')
      else if (r === '3') resolve('Ropsten')
      else if (r === '42') resolve('Kovan')
      else if (r.length === 13) resolve('Development')
      else resolve('Unknown')
    })
  })
}
function* fetchEthereumInfoWorker() {
  try {
    yield put({type: 'BLOCK_NUMBER_REQUESTED'})
    const blockNumber = yield call(getBlockNumber)
    yield put({type: 'BLOCK_NUMBER_SUCCEED', blockNumber})
  } catch (e) {
    yield put({type: 'BLOCK_NUMBER_FAILED', e: e.message})
  }
  try {
    yield put({type: 'FETCH_NETWORK_ID_REQUESTED'})
    const network = yield call(getNetwork)
    yield put({type: 'FETCH_NETWORK_ID_SUCCEED', network})
  } catch (e) {
    yield put({type: 'FETCH_NETWORK_ID_FAILED', e: e.message})
  }
}
// ------------------------------------
// Put useful contract info in store
// ------------------------------------
let fetchContractsInfo = () => {
  let contractsInfos = {}
  for (let key in contracts) {
    if(contracts.hasOwnProperty(key)) {
      contractsInfos = {...contractsInfos, [contracts[key].name]: {}}
      contractsInfos[ contracts[key].name ].address = contracts[key].address
    }
  }
  return contractsInfos
}
function* fetchContractsInfoWorker() {
  try {
    let contractsInfo = yield call(fetchContractsInfo)
    yield put({type: 'FETCH_CONTRACTS_INFO_SUCCEED', contractsInfo})
  } catch (e) {
    yield put({type: 'FETCH_CONTRACTS_INFO_FAILED', error: e})
  }
}
// ========================================================
// Watch Ethereum saga
// ========================================================
export function* watchGetBlockNumber() {
  yield takeEvery('FETCH_CONTRACTS_INFO_REQUESTED', fetchContractsInfoWorker)
  yield takeEvery('FETCH_ETHEREUM_INFO_REQUESTED', fetchEthereumInfoWorker)
}