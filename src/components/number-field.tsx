import React, { Component, ChangeEvent } from 'react'
import { FieldData } from 'forms-builder'

export interface NumberFieldData extends FieldData<number | undefined> {}
export class NumberField extends Component<NumberFieldData> {
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
    return (
      <div>
        {label && <span>{label}</span>}
        <input
          style={{ display: 'block' }}
          type="text"
          {...rest}
          onChange={this.handleChange}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    )
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const { onChange } = this.props

    if (value === '') onChange(undefined)

    if (/^[0-9]+$/.test(value)) onChange(parseInt(value, 10))
  }
}
