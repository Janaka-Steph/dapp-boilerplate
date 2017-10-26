// Libraries
//var SafeMath = artifacts.require('../../../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol')

var ConvertLib = artifacts.require('ConvertLib')
var MetaCoin = artifacts.require('MetaCoin')
var Greeter = artifacts.require('Greeter')
var ProofOfExistence = artifacts.require('ProofOfExistence')

module.exports = function (deployer) {
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, MetaCoin)
  deployer.deploy(MetaCoin)
  deployer.deploy(Greeter)
  deployer.deploy(ProofOfExistence)
}