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
    if (typeof window.web3 !== 'undefined') {
      console.log('Web3 detected on window')
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      console.log('No Web3 detected \nSet Web3')
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(new Web3.providers.HttpProvider(web3Location))
      console.log('web3 added to window')
    }
    // ======================================================
    // Prepare smart contracts
    // ======================================================
    Promise.all(
      Artifacts
        .map(artifact => {
          const c = contract(artifact)
          if(artifact.isFactory) {
            console.warn(`${artifact.contract_name} not deployed`)
            c.setProvider(window.web3.currentProvider)
            return c
          }
          c.setProvider(window.web3.currentProvider)
          return c.deployed()
        }))
      .then((sc) => {
        let name, obj
        sc.forEach(function (c) {
          if (typeof c === 'object') {
            // Add name property to the object
            name = c.constructor.contract_name
            c['name'] = name
            // Add each contract to exported contracts*/
            contracts[name] = c
          }
          else {
            name = c._json.contract_name
            obj = {...c, name}
            // Add each contract to exported contracts*/
            contracts[name] = obj
          }
          resolve(contracts)
        })
        console.log(`Smart contracts ready`)
      })
      .catch(e => reject(e))
  })
})