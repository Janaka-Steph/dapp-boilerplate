var RPS = artifacts.require('RPS')
var Hasher = artifacts.require('Hasher')

module.exports = function (deployer) {
  deployer.deploy(Hasher)
}