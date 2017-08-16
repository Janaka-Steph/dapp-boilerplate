/*
import * as assert from 'assert'
const StandardTokenAbstraction = artifacts.require('StandardToken')
let StandardToken


contract('StandardToken', (accounts) => {
  before(async () => {
    StandardToken = await StandardTokenAbstraction.deployed()
  })

  it('should deploy contract', () => {
    assert(StandardToken.address, "contract is not deployed")
  })

  it('should transfer', async () => {
    console.log('accounts[1]', accounts[1])
    console.log('st pppp ---', await StandardToken.transfer.sendTransaction(accounts[1], 10, {from: accounts[0]}))
    //assert(await StandardToken.transfer(accounts[1], 10), 'transfer has failed')
  })

  it('should check balance', async () => {
    const balance = await StandardToken.balanceOf(accounts[0])
    console.log('balance', balance.valueOf())
  })
})
*/