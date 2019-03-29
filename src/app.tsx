import React, { Component } from 'react'
import { formBuilder } from 'forms-builder'
import { NumberField, NumberFieldData } from './components/number-field'
import { range } from './utils'

const COL_COUNT = 3
const colsIndexes = [...range(0, COL_COUNT - 1)]

interface State {
  rowsIndexes: string[]
}

export class App extends Component<{}, State> {
  private _form = formBuilder<any>({})
    .configure({})
    .build(this)

  constructor(props: {}) {
    super(props)

    this.state = {
      rowsIndexes: [this.getId()]
    }
  }

  render() {
    const { handleSubmit } = this._form
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh'
        }}
      >
        <form style={{ margin: 'auto' }} onSubmit={handleSubmit}>
          <h1>Ranges</h1>
          {this.renderRows()}
        </form>
      </div>
    )
  }

  private renderRows = () =>
    this.state.rowsIndexes.map(id => this.renderRow(id))

  private renderRow = (id: string) => {
    const { fields } = this._form
    const cols: NumberFieldData[] = []

    colsIndexes.forEach(colIndex => {
      const name = `${id}-${colIndex}`
      if (!fields[name])
        this._form.addField({
          name
        })

      cols.push(fields[name])
    })

    return (
      <div
        key={id}
        style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 20 }}
      >
        {cols.map((field, colIndex) => (
          <NumberField
            key={field.name}
            {...field}
            label={this.getLabelField(colIndex)}
          />
        ))}
        <button onClick={() => this.addRow(id)}>+</button>
        <button onClick={() => this.removeRow(id)}>-</button>
      </div>
    )
  }

  private addRow = (id: string) => {
    this.setState(prevState => {
      const currentRowIndex = prevState.rowsIndexes.findIndex(
        item => item === id
      )
      const rowsIndexes = [...prevState.rowsIndexes]
      rowsIndexes.splice(currentRowIndex + 1, 0, this.getId())
      return {
        rowsIndexes
      }
    })
  }

  private removeRow = (id: string) => {
    this._form.removeFields(
      colsIndexes.map(colIndex => this.getFieldName(id, colIndex))
    )
    this.setState(prevState => ({
      rowsIndexes: prevState.rowsIndexes.filter(item => item !== id)
    }))
  }

  private getId = () =>
    Math.random()
      .toString(36)
      .substring(2, 5)

  private getFieldName = (id: string, colIndex: number) => `${id}-${colIndex}`

  private getLabelField = (colIndex: number) => {
    switch (colIndex) {
      case 0:
        return 'from'
      case 1:
        return 'to'
      case 2:
        return 'value'
      default:
        return null
    }
  }

  // private getValidateField = (id: string, colIndex: number, value: number) => {
  //   const { fields } = this._form
  //   const { rowsIndexes } = this.state
  //   const currentRowIndex = rowsIndexes.findIndex(item => item === id)
  //   switch (colIndex) {
  //     case 0: {
  //       const prevRowId = rowsIndexes[currentRowIndex - 1]
  //       const prevField = fields[this.getFieldName(prevRowId, 1)]
  //       if (prevField && prevField.value > value) return 'min-value'
  //       return
  //     }
  //     case 1: {
  //       const nextRowId = rowsIndexes[currentRowIndex + 1]
  //       const nextField = fields[this.getFieldName(nextRowId, 0)]
  //       if (nextField && nextField.value < value) return 'max-value'
  //       return
  //     }
  //     default:
  //       return
  //   }
  // }
}
