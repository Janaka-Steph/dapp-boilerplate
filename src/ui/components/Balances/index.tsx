import * as React from 'react'

const Balances = (props) => {
  const {p1balance, p2balance} = props
  return (
      <div className="row">
        <div className="col-12">
          <p>{`Player 1 balance: ${p1balance || 'unknown'}`}</p>
          <p>{`Player 2 balance: ${p2balance || 'unknown'}`}</p>
        </div>
      </div>
  )
}
export default Balances