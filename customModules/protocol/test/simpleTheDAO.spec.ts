import * as assert from 'assert'
const SimpleTheDAOAbs = artifacts.require('SimpleTheDAO')
const MalloryAbs = artifacts.require('Mallory')
const Mallory2Abs = artifacts.require('Mallory2')
let SimpleTheDAO, Mallory, Mallory2

contract('SimpleTheDAO', function (accounts) {
  before(async () => {
    SimpleTheDAO = await SimpleTheDAOAbs.deployed()
    Mallory = await MalloryAbs.deployed()
    Mallory2 = await Mallory2Abs.deployed()
  })

  it('creation: should have address', async () => {
    const address = await SimpleTheDAO.address
    assert(web3.isAddress(address))
  })

  it('should withdraw DAO balance - Mallory', async () => {
    await SimpleTheDAO.donate(Mallory.address, {value: web3.toWei(0.2, 'ether')})
    await SimpleTheDAO.donate(accounts[1], {value: web3.toWei(0.4, 'ether')})
    await SimpleTheDAO.donate(accounts[2], {value: web3.toWei(0.6, 'ether')})
    await SimpleTheDAO.donate(accounts[3], {value: web3.toWei(0.8, 'ether')})
    let malloryBalance1 = web3.fromWei(web3.eth.getBalance(Mallory.address), 'ether').toNumber()
    assert.equal(malloryBalance1, 0)
    await Mallory.sendTransaction() // trigger fallback
    let malloryBalance2 = web3.fromWei(web3.eth.getBalance(Mallory.address), 'ether').toNumber()
    assert.equal(malloryBalance2, 2)
    // withdraw from contract
    console.log('Account 0 before hack: ', web3.fromWei(web3.eth.getBalance(accounts[0]), 'ether').toNumber())
    const res = await Mallory.getJackpot()
    assert.equal(res.logs[0].args.addr, accounts[0], "Expected accounts[0] address")
    assert.equal(web3.fromWei(res.logs[1].args.balance, 'ether').toNumber(), 2, "Contract balance not correct")
    assert.equal(web3.fromWei(res.logs[2].args.balance, 'ether').toNumber(), 0, "Contract balance not correct")
    console.log('Account 0 after hack: ', web3.fromWei(web3.eth.getBalance(accounts[0]).toNumber(), 'ether'))
  })

  it('should withdraw DAO balance - Mallory2', async () => {
    await SimpleTheDAO.donate(Mallory.address, {value: web3.toWei(0.2, 'ether')})
    await SimpleTheDAO.donate(accounts[1], {value: web3.toWei(0.4, 'ether')})
    await SimpleTheDAO.donate(accounts[2], {value: web3.toWei(0.6, 'ether')})
    await SimpleTheDAO.donate(accounts[3], {value: web3.toWei(0.8, 'ether')})
    let balance1 = web3.eth.getBalance(Mallory2.address)
    balance1 = web3.fromWei(balance1.toNumber(), 'ether')
    assert.equal(balance1, 0)
    const account0BeforeHack = web3.fromWei(web3.eth.getBalance(accounts[0]), 'ether').toNumber()
    console.log('account 0 before hack: ', account0BeforeHack)
    await Mallory2.attack({value: 1})
    await Mallory2.getJackpot()
    const account0AfterHack = web3.fromWei(web3.eth.getBalance(accounts[0]), 'ether').toNumber()
    console.log('account 0 after hack: ', account0AfterHack)
  })
})