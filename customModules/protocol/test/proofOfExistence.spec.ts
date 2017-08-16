import * as assert from 'assert'
const PoEAbstraction = artifacts.require('ProofOfExistence')
let PoE
let document = 'document'
let hash = '0x43cc23fa52b87b4cc1d02b5b114154151d6adddb17c9fddc06b027fa99e24008'

contract('Proof of existence', (accounts) => {
  before(async () => {
    PoE = await PoEAbstraction.deployed()
  })

  it('should deploy contract', () => {
    assert(PoE.address, "contract is not deployed")
  })

  it('should calculate proof of a document', async () => {
    const proof = await PoE.calculateProof(document)
    assert.equal(proof, hash,'proof is not correct')
  })

  it('should notarize and verify a document', async () => {
    await PoE.notarize(document)
    const proof = await PoE.verifyProof(document)
    assert(web3.isAddress(proof[0]), 'owner address is not correct')
    assert.equal(proof[1].valueOf().length, 10, 'timestamp is not correct')
  })
})