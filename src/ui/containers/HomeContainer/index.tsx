import * as React from 'react'
import {connect} from 'react-redux'
import Info from '../../components/common/Info'

/**
 * Home Page
 */
let HomePage = (props) => {
  const {
    ethereum,
    user,
  } = props

  // check host and name for metamask
  const {currentProvider: {host = null, constructor: {name = null} = {}} = {}} = window.web3 || {}

  return (
    <div id="home-page">
      <div className="row">
        <div className="col">
          <h2>Welcome to Dapp Boilerplate</h2>
        </div>
      </div>

      <Info
        defaultAccount={user && user.defaultAccount ? user.defaultAccount : 'No account detected'}
        balance={user && user.balance}
        blockNumber={ethereum && ethereum.blockNumber}
        contracts={ethereum && ethereum.contracts}
        currentProvider={host || name}
        isWeb3Connected={!!window.web3}
        network={ethereum && ethereum.network}
      />
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    ethereum: state.ethereum,
    user: state.user,
  }
}
export default connect(mapStateToProps)(HomePage)