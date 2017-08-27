import * as React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm, reset} from 'redux-form'
import {Input} from '../common/Inputs'
import MoveChoices from '../MoveChoices'
// ------------------------------------
// Form
// ------------------------------------
let SolveForm = (props) => {
  const {handleSubmit, onSubmit} = props
  return (
    <div id="SolveForm" className="form">
      <Form onSubmit={handleSubmit(onSubmit)}>
       <MoveChoices/>

        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              label="salt"
              name="salt"
              placeholder="Enter your salt"
              type="text"
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
export default SolveForm = reduxForm({
  form: 'SolveForm',
})(SolveForm)