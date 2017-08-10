var ConvertLib = artifacts.require("ConvertLib")
var Greeter = artifacts.require("Greeter")
var MetaCoin = artifacts.require("MetaCoin")
var ProofOfExistence = artifacts.require("ProofOfExistence")

module.exports = function(deployer) {
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, MetaCoin)
  deployer.deploy(Greeter)
  deployer.deploy(MetaCoin)
  deployer.deploy(ProofOfExistence)
}