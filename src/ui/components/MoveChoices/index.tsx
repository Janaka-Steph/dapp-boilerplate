import * as React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm, reset} from 'redux-form'

const MoveChoices = () => {
  return (
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
  )
}

export default MoveChoices