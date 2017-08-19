import * as assert from 'assert'
const KotETAbstraction = artifacts.require('./contracts/KotET/KotET.sol')
const KotET2Abstraction = artifacts.require('./contracts/KotET/KotET2.sol')
const BobAbstraction = artifacts.require('./contracts/KotET/Bob.sol')
let KotET, KotET2, Bob

contract('KotET', function (accounts) {
  beforeEach(async () => {
    KotET = await KotETAbstraction.new({value: web3.toWei('1', 'ether')})
    KotET2 = await KotET2Abstraction.new()
    Bob = await BobAbstraction.new()
  })

  it('creation: should have address', async () => {
    assert(web3.isAddress(await KotET.address))
    assert(web3.isAddress(await KotET2.address))
    assert(web3.isAddress(await Bob.address))
  })
})