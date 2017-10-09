// Libraries
//var SafeMath = artifacts.require('../../../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol')

var ConvertLib = artifacts.require('ConvertLib')
var MetaCoin = artifacts.require('MetaCoin')
var Greeter = artifacts.require('Greeter')
var ProofOfExistence = artifacts.require('ProofOfExistence')

// Standard Token
//var StandardToken = artifacts.require('StandardToken')
//var HumanStandardToken = artifacts.require('HumanStandardToken')
//var HumanStandardTokenFactory = artifacts.require('HumanStandardTokenFactory')
//var SampleRecipientSuccess = artifacts.require('SampleRecipientSuccess')
//var SampleRecipientThrow = artifacts.require('SampleRecipientThrow')
// ERC223 Token
//var ERC223 = artifacts.require('ERC223')
//var ERC223Token = artifacts.require('ERC223Token')
//var ContractReceiver = artifacts.require('ContractReceiver')
// Simple TheDAO
//var SimpleTheDAO = artifacts.require('./contracts/SimpleTheDAO/SimpleTheDAO.sol')
//var Mallory = artifacts.require('./contracts/SimpleTheDAO/Mallory.sol')
//var Mallory2 = artifacts.require('./contracts/SimpleTheDAO/Mallory2.sol')

module.exports = function (deployer) {
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, MetaCoin)
  deployer.deploy(MetaCoin)
  deployer.deploy(Greeter)
  deployer.deploy(ProofOfExistence)
  // Token standard
  //deployer.deploy(StandardToken)
  //deployer.deploy(HumanStandardToken)
  //deployer.deploy(HumanStandardTokenFactory)
  //deployer.deploy(SampleRecipientSuccess)
  //deployer.deploy(SampleRecipientThrow)
  // ERC223 Token
  //deployer.deploy(ERC223)
  //deployer.deploy(ERC223Token)
  //deployer.deploy(ContractReceiver)
  /*
  // SimpleTheDAO
  deployer.deploy(SimpleTheDAO)
  deployer.link(SimpleTheDAO, SafeMath)
    .then(() => {
      return deployer.deploy([
        [Mallory, SimpleTheDAO.address],
        [Mallory2, SimpleTheDAO.address],
      ])
    })
  */
}