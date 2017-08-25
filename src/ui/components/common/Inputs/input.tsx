import * as React from 'react'
import { Component } from 'react'
import * as classNames from 'classnames'
import {FormGroup, FormFeedback, Input, Label} from 'reactstrap'

export default class RenderInput extends Component<{
  id: string
  input: string,
  label: string,
  placeholder: string,
  type: string,
  meta: any
}, {}> {

  render() {
    const {
            id,
            input,
            label,
            placeholder,
            type,
            meta: {
              touched,
              error,
            },
          } = this.props;

    const classes = classNames({
      success: touched && !error,
      danger: touched && error,
    })

    return (
      <FormGroup color={classes}>
        {id && label && <Label for={id}>{label}</Label>}
        <Input {...input} type={type} placeholder={placeholder} state={classes} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    )
  }
}