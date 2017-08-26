import * as React from 'react'
import {connect} from 'react-redux'
import RPSDeployForm from '../../components/RPSDeployForm'
import MoveForm from '../../components/MoveForm'
import SolveForm from '../../components/SolveForm'

/**
 * RPSContainer
 */
class RPSPage extends React.Component<{
  onDeploySubmit: () => {},
  onMoveSubmit: () => {},
  onSolveSubmit: () => {},
}, {}> {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {onDeploySubmit, onMoveSubmit, onSolveSubmit} = this.props

    return (
      <div id="test-page">
        <h1>Rock Paper Scissor Lizard Spoke</h1>
        <div className="row">
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
    errors: state.rps.errors,
    txs: state.rps.txs,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onDeploySubmit: (values) => dispatch({type: 'TX_RPS_DEPLOY_SUBMISSION_REQUESTED', values}),
    onMoveSubmit: (values) => dispatch({type: 'TX_MOVE_SUBMISSION_REQUESTED', values}),
    onSolveSubmit: (values) => dispatch({type: 'TX_SOLVE_SUBMISSION_REQUESTED', values}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RPSPage)