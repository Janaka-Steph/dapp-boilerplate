var RPS = artifacts.require('RPS')
var Hasher = artifacts.require('Hasher')

module.exports = function (deployer) {
  // keccak-256 of '11', accounts[1]
  // deployer.deploy(RPS, '0x9b68e489a07c86105b2c34adda59d3851d6f33abd41be6e9559cf783147db5dd', '0x24c9cb9b798117bb88276ed8a5c1ae400b83bcb3',{value: web3.toWei(2)})
  // deployer.deploy(RPS, {value: web3.toWei(2)})
  deployer.deploy(Hasher)
}