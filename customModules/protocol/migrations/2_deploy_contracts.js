var ConvertLib = artifacts.require("ConvertLib")
var MetaCoin = artifacts.require("MetaCoin")
var Greeter = artifacts.require("Greeter")
var ProofOfExistence = artifacts.require("ProofOfExistence")
// Standard Token
var StandardToken = artifacts.require("StandardToken")
var HumanStandardToken = artifacts.require("HumanStandardToken")
var HumanStandardTokenFactory = artifacts.require("HumanStandardTokenFactory")
var SampleRecipientSuccess = artifacts.require("SampleRecipientSuccess")
var SampleRecipientThrow = artifacts.require("SampleRecipientThrow")
// ERC223 Token
var ERC223 = artifacts.require("ERC223")
var ERC223Token = artifacts.require("ERC223Token")
var ContractReceiver = artifacts.require("ContractReceiver")

module.exports = function(deployer) {
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, MetaCoin)
  deployer.deploy(MetaCoin)
  deployer.deploy(Greeter)
  deployer.deploy(ProofOfExistence)
  // Token standard
  deployer.deploy(StandardToken)
  deployer.deploy(HumanStandardToken)
  deployer.deploy(HumanStandardTokenFactory)
  deployer.deploy(SampleRecipientSuccess)
  deployer.deploy(SampleRecipientThrow)
  // ERC223 Token
  //deployer.deploy(ERC223)
  //deployer.deploy(ERC223Token)
  //deployer.deploy(ContractReceiver)
}