import * as assert from 'assert'
const MetaCoinAbstraction = artifacts.require('MetaCoin')
let MetaCoin


contract('MetaCoin', (accounts) => {
  before(async () => {
    MetaCoin = await MetaCoinAbstraction.deployed()
  })

  it('should deploy contract', () => {
    assert(MetaCoin.address, "contract is not deployed")
  })

  it("should put 10000 MetaCoin in the first account", async () => {
    const balance = await MetaCoin.getBalance.call(accounts[0])
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account")
  })

  it("should call a function that depends on a linked library", async () => {
    const balance = (await MetaCoin.getBalance.call(accounts[0])).toNumber()
    const balanceEth = (await MetaCoin.getBalanceInEth.call(accounts[0])).toNumber()
    assert.equal(balanceEth, 2 * balance, "Library function returned unexpected function, linkage may be broken")
  })

  it("should send coin correctly", async () => {
    const amount = 10
    const balance1Start = (await MetaCoin.getBalance.call(accounts[0])).toNumber()
    const balance2Start = (await MetaCoin.getBalance.call(accounts[1])).toNumber()
    MetaCoin.sendCoin(accounts[1], amount, {from: accounts[0]})
    const balance1End = (await MetaCoin.getBalance.call(accounts[0])).toNumber()
    const balance2End = (await MetaCoin.getBalance.call(accounts[1])).toNumber()
    assert.equal(balance1End, balance1Start - amount, "Amount wasn't correctly taken from the sender")
    assert.equal(balance2End, balance2Start + amount, "Amount wasn't correctly sent to the receiver")
  })
})
