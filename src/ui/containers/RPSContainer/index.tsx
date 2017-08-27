import * as React from 'react'
import {connect} from 'react-redux'
import RPSDeployForm from '../../components/RPSDeployForm'
import MoveForm from '../../components/MoveForm'
import SolveForm from '../../components/SolveForm'
import HasherForm from '../../components/HasherForm'
import Balances from '../../components/Balances'
import Timeouts from '../../components/Timeouts'
/**
 * RPSContainer
 */
class RPSPage extends React.Component<{
  onDeploySubmit: () => {},
  onGenerateHashSubmit: () => {},
  onMoveSubmit: () => {},
  onP1TimeoutSubmit: () => {},
  onP2TimeoutSubmit: () => {},
  onSolveSubmit: () => {},
}, {}> {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {
      hash,
      onDeploySubmit,
      onGenerateHashSubmit,
      onMoveSubmit,
      onSolveSubmit,
      onP1TimeoutSubmit,
      onP2TimeoutSubmit,
      p1balance,
      p2balance,
    } = this.props

    return (
      <div id="rps-page">
        <h1>Rock Paper Scissor Lizard Spoke</h1>
        <div className="row">
          <div className="col">
            <h2>Player's balances</h2>
            <Balances
              p1balance={p1balance}
              p2balance={p2balance}
            />
          </div>
        </div>

        <div className="row m-top-50">
          <div className="col">
            <Timeouts
              onP1TimeoutSubmit={onP1TimeoutSubmit}
              onP2TimeoutSubmit={onP2TimeoutSubmit}
            />
          </div>
        </div>

        <div className="row m-top-50">
          <div className="col">
            <h2>Player 1 Generate a commitment hash</h2>
            <HasherForm
              onSubmit={onGenerateHashSubmit}
            />
            <p className="m-top-10">{`Hash: ${hash || ''}`}</p>
          </div>
        </div>

        <div className="row m-top-50">
          <div className="col">
            <h2>Player 1 deploy a new RPSLS contract</h2>
            <RPSDeployForm
              onSubmit={onDeploySubmit}
            />
          </div>
        </div>

        <div className="row m-top-50">
          <div className="col">
            <h2>Player 2 submit a move</h2>
            <MoveForm
              onSubmit={onMoveSubmit}
            />
          </div>
        </div>

        <div className="row m-top-50 m-btm-50">
          <div className="col">
            <h2>Player 1 reveal its move</h2>
            <SolveForm
              onSubmit={onSolveSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hash: state.rps.hash,
    errors: state.rps.errors,
    p1balance: state.user.balance,
    p2balance: state.user.p2balance,
    txs: state.rps.txs,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onDeploySubmit: (values) => dispatch({type: 'TX_RPS_DEPLOY_SUBMISSION_REQUESTED', values}),
    onMoveSubmit: (values) => dispatch({type: 'TX_MOVE_SUBMISSION_REQUESTED', values}),
    onSolveSubmit: (values) => dispatch({type: 'TX_SOLVE_SUBMISSION_REQUESTED', values}),
    onGenerateHashSubmit: (values) => dispatch({type: 'GENERATE_HASH_SUBMISSION_REQUESTED', values}),
    onP1TimeoutSubmit: () => dispatch({type: 'TX_P1_TIMEOUT_SUBMISSION_REQUESTED'}),
    onP2TimeoutSubmit: () => dispatch({type: 'TX_P2_TIMEOUT_SUBMISSION_REQUESTED'}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RPSPage)