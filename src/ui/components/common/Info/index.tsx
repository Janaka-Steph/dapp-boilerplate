import * as React from 'react'
import styles from './styles.css'
import {Card} from 'reactstrap'
import {Icon} from 'react-fa'

let contractInfos = (contracts) => {
  return Object.keys(contracts).map((contractName) => {
    return (
      <p key={contractName}>
        {contractName} contract address: {contracts[contractName].address
        ? contracts[contractName].address
        : <span><Icon name="warning"/> {'Contract not deployed or unreachable'}</span>}
      </p>
    )
  })
}
/**
 * Display basic info about user, blockchain status, ...
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
export default function Info (props) {
  return (
    <div className="row">
      <div className="col">
        <Card className={`mx-auto ${styles.info}`}>
          <h4>User Info</h4>
          <p>{'User account: '}<span className="ethereum-address">{props.defaultAccount}</span></p>
          <p>
            Balance: {props.balance
              ? `${props.balance} ETH`
              : 'Unknown'}
            </p>
          <h4>Ethereum Blockchain Info</h4>
          <p>{`Web3 status: ${props.isWeb3Connected ? "connected" : "not connected"}`}</p>
          <p>{`Network: ${props.network}`}</p>
          <p>{`Web3 provider host: ${props.currentProvider}`}</p>
          <p>{`Block number: ${props.blockNumber}`}</p>
          <h4>Contracts Info</h4>
          {contractInfos(props.contracts)}
        </Card>
      </div>
    </div>
  )
}
