const RPS = require('./build/contracts/RPS.json')
const Hasher = require('./build/contracts/Hasher.json')

module.exports = [
  Object.assign({}, RPS, {isFactory: true}),
  Object.assign({}, Hasher, {isFactory: false}),
]