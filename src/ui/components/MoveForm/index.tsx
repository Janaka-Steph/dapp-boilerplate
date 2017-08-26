import * as React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm, reset} from 'redux-form'
import {Input} from '../common/Inputs'
// ------------------------------------
// Validation
// ------------------------------------
// const validate = values => {}
// ------------------------------------
// After Submit
// ------------------------------------
// const afterSubmit = (result, dispatch) =>
//  dispatch(reset('RPSDeployForm'))
// ------------------------------------
// Form
// ------------------------------------
let MoveForm = (props) => {
  const {handleSubmit, onSubmit} = props
  return (
    <div id="MoveForm" className="form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-2">
            <Field
              component='input'
              label="rock"
              name="move"
              type="radio"
              value="1"
            />
            {' Rock'}
          </div>

          <div className="col-2">
            <Field
              component='input'
              label="paper"
              name="move"
              type="radio"
              value="2"
            />
            {' Paper'}
          </div>

          <div className="col-2">
            <Field
              component='input'
              label="scissors"
              name="move"
              type="radio"
              value="3"
            />
            {' Scissors'}
          </div>

          <div className="col-2">
            <Field
              component='input'
              label="spoke"
              name="move"
              type="radio"
              value="4"
            />
            {' Spoke'}
          </div>

          <div className="col-2">
            <Field
              component='input'
              label="lizard"
              name="move"
              type="radio"
              value="5"
            />
            {' Lizard'}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              label="stake"
              name="stake"
              placeholder="Enter the stake"
              type="number"
            />
          </div>
        </div>

        <Button
          block
          color="primary"
          outline
          size="lg"
          type="submit"
        >
          {'Submit'}
        </Button>
      </Form>
    </div>
  )
}
export default MoveForm = reduxForm({
  form: 'MoveForm',
})(MoveForm)