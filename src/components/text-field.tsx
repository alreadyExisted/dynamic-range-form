import React, { Component, ChangeEvent } from 'react'
import { FieldData } from 'forms-builder'

export class TextField extends Component<FieldData<string>> {
  render() {
    const {
      fieldRef,
      dirty,
      touched,
      error,
      warn,
      label,
      onChange,
      ...rest
    } = this.props
    return <input type="text" {...rest} onChange={this.onChange} />
  }

  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.currentTarget.value)
  }
}
