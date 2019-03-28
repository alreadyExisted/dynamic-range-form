import React, { Component } from 'react'
import { formBuilder } from 'forms-builder'
import { NumberField, NumberFieldData } from './components/number-field'
import { range } from './utils'

const COL_COUNT = 3

// interface OnChangeFnArgs {
//   field: NumberFieldData
//   value: number | undefined
//   colIndex: number
//   fieldIndex: number
// }

interface State {
  rowsCount: number
}

export class App extends Component<{}, State> {
  private _form = formBuilder<any>({})
    .configure({})
    .build(this)

  constructor(props: {}) {
    super(props)

    this.state = {
      rowsCount: 1
    }
  }

  render() {
    const { handleSubmit } = this._form
    const { rowsCount } = this.state
    const rows = new Array(rowsCount).fill(0)
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh'
        }}
      >
        <form style={{ margin: 'auto' }} onSubmit={handleSubmit}>
          {rows.map((_, index) => this.renderRow(index))}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <button onClick={this.addRow}>ADD</button>
          </div>
        </form>
      </div>
    )
  }

  private renderRow = (rowIndex: number) => {
    const cols: NumberFieldData[] = []
    const startIndex = rowIndex * COL_COUNT
    const endIndex = (rowIndex + 1) * COL_COUNT - 1
    const fieldsIndexes = [...range(startIndex, endIndex)]

    const { fields } = this._form

    fieldsIndexes.forEach(index => {
      if (!fields[index])
        this._form.addField({
          name: `${index}`
        })
      cols.push(fields[`${index}`])
    })

    return (
      <div key={rowIndex} style={{ marginBottom: 20 }}>
        {cols.map((field, _colIndex) => (
          <NumberField
            key={field.name}
            {...field}
            // onChange={value =>
            //   this.onChange({
            //     field,
            //     value,
            //     fieldIndex: fieldsIndexes[colIndex],
            //     colIndex
            //   })
            // }
          />
        ))}
      </div>
    )
  }

  private addRow = () =>
    this.setState(prevState => ({
      rowsCount: prevState.rowsCount + 1
    }))

  // private onChange = ({
  //   field,
  //   value,
  //   colIndex,
  //   fieldIndex
  // }: OnChangeFnArgs) => {
  //   const { fields } = this._form
  //   if (value === undefined) return field.onChange(value)

  //   switch (colIndex) {
  //     case 0: {
  //       const prevField = fields[fieldIndex - COL_COUNT]
  //       console.log({
  //         colIndex,
  //         prevField,
  //         count: fieldIndex - COL_COUNT,
  //         bool: !prevField || prevField.value < value,
  //         pValue: prevField && prevField.value,
  //         value
  //       })
  //       if (!prevField || prevField.value < value) return field.onChange(value)
  //       return
  //     }
  //     case 1: {
  //       const nextField = fields[fieldIndex + COL_COUNT]
  //       console.log({
  //         colIndex,
  //         nextField,
  //         count: fieldIndex + COL_COUNT,
  //         bool: !nextField || nextField.value > value
  //       })
  //       if (!nextField || nextField.value > value) return field.onChange(value)
  //       return
  //     }
  //     default:
  //       return field.onChange(value)
  //   }
  // }
}
