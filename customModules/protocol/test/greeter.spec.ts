import * as assert from 'assert'
const GreeterAbstraction = artifacts.require('Greeter')
let Greeter

contract('Greeter', (accounts) => {
  before(async () => {
    Greeter = await GreeterAbstraction.deployed()
  })

  it('should deploy contract', () => {
    assert(Greeter.address, "contract is not deployed")
  })

  it('should greet', async () => {
    const value = 'Kevin!'
    await Greeter.modify(value)
    const expected = await Greeter.greet()
    assert.equal(value, expected, "greet var not set properly")
  })

  it('should emit an event', (done) => {
    const value = 'test'
    Greeter.modify(value).then(() => {
      let changeEvent = Greeter.Change()
      changeEvent.get((err, events) => {
        assert.equal(value, events[0].args.value)
        done()
      })
    })
  })
})