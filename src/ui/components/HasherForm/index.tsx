import * as React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm, reset} from 'redux-form'
import {Input} from '../common/Inputs'
import MoveChoices from '../MoveChoices'
// ------------------------------------
// Validation
// ------------------------------------
//
// ------------------------------------
// After Submit
// ------------------------------------
const afterSubmit = (result, dispatch) =>
  dispatch(reset('HasherForm'))
// ------------------------------------
// Form
// ------------------------------------
let HasherForm = (props) => {
  const {handleSubmit, onSubmit} = props
  return (
    <div id="HasherForm" className="form">
      <Form onSubmit={handleSubmit(onSubmit)}>
       <MoveChoices />

        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              label="salt"
              name="salt"
              placeholder="Enter the salt"
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
          {'Generate Hash'}
        </Button>
      </Form>
    </div>
  )
}
export default HasherForm = reduxForm({
  form: 'HasherForm',
  onSubmitSuccess: afterSubmit,
})(HasherForm)