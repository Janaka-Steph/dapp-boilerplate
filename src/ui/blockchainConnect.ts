import * as Artifacts from '../../customModules/protocol/index.js'
import * as truffleConfig from '../../customModules/protocol/truffle.js'
import * as contract from 'truffle-contract'
import * as Web3 from 'web3'

export let contracts = {}
export const run = () => new Promise((resolve, reject) => {
  // ======================================================
  // Set Web3
  // ======================================================
  window.addEventListener('load', function () {
    // Set Web3
    let web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`
    Web3.givenProvider ? console.log('Web3 detected') : console.log('No Web3 detected \nSet Web3')
    window.web3 = new Web3(Web3.givenProvider || web3Location)
    console.log('Web3 has been set')
    // ======================================================
    // Prepare smart contracts
    // ======================================================
    Promise.all(
      Artifacts
        .map(artifact => contract(artifact))
        .map((contract) => {
          contract.setProvider(window.web3.currentProvider)
          //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
          if (typeof contract.currentProvider.sendAsync !== 'function') {
            contract.currentProvider.sendAsync = () => contract.currentProvider.send.apply(contract.currentProvider, arguments)
          }
          // end hack
          return contract.deployed()
        }))
      .then((deployedContracts) => {
        deployedContracts.forEach(function (contract) {
          // Add name property to the object
          let name = contract.constructor.contract_name
          contract['name'] = name
          // Add each contract to exported contracts
          contracts[name] = contract
          resolve(contracts)
        })
        console.log('Smart contracts ready')
      })
      .catch(e => reject(e))
  })
})