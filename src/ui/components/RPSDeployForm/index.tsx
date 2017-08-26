import * as React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm, reset} from 'redux-form'
import {Input} from '../common/Inputs'
// ------------------------------------
// Validation
// ------------------------------------
const validate = values => {
  const errors: {c1Hash?: string, addrPlayerTwo?: string} = {}
  if (!values.c1Hash) errors.c1Hash = 'Required'
  /*else if ('') {
    errors.c1Hash = 'Commitment hash must be keccak-256 of move + salt'
  }*/
  if (!values.addrPlayerTwo) errors.addrPlayerTwo = 'Required'
  /*else if ('') {
    errors.addrPlayerTwo = ''
  }*/
  return errors
}
// ------------------------------------
// After Submit
// ------------------------------------
const afterSubmit = (result, dispatch) =>
  dispatch(reset('RPSDeployForm'))
// ------------------------------------
// Form
// ------------------------------------
let RPSDeployForm = (props) => {
  const {handleSubmit, onSubmit} = props
  return (
    <div id="RPSDeployForm" className="form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              label="c1Hash"
              name="c1Hash"
              placeholder="Enter the commitment hash"
              type="text"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              label="addrPlayerTwo"
              name="addrPlayerTwo"
              placeholder="Enter player 2 address"
              type="text"
            />
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
export default RPSDeployForm = reduxForm({
  form: 'RPSDeployForm',
  onSubmitSuccess: afterSubmit,
  validate
})(RPSDeployForm)