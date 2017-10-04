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