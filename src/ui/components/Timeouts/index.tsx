import * as React from 'react'
import {Button, Form} from 'reactstrap'

const Timeouts = (props) => {
  const {onP1TimeoutSubmit, onP2TimeoutSubmit} = props
  return (
    <div className="row">
      <div className="col-6">
        <Button
          block
          color="warning"
          onClick={() => onP2TimeoutSubmit()}
          outline
          size="lg"
          type="submit"
        >
          {'P1 Ask Timeout'}
        </Button>
      </div>

      <div className="col-6">
        <Button
          block
          color="warning"
          onClick={() => onP1TimeoutSubmit()}
          outline
          size="lg"
          type="submit"
        >
          {'P2 Ask Timeout'}
        </Button>
      </div>
    </div>
  )
}
export default Timeouts