import React, { Component } from 'react'
import { formBuilder, FieldData } from 'forms-builder'
import { TextField } from './components/text-field'
import { range } from './utils'

const COL_COUNT = 3

interface State {
  rows: React.ReactNode[]
}

export class App extends Component<{}, State> {
  private _form = formBuilder<any>({})
    .configure({})
    .build(this)

  constructor(props: {}) {
    super(props)

    this.state = {
      rows: [this.renderRow(0)]
    }
  }

  render() {
    const { rows } = this.state
    const { handleSubmit } = this._form
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh'
        }}
      >
        <form style={{ margin: 'auto' }} onSubmit={handleSubmit}>
          {rows}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <button onClick={this.addRow}>ADD</button>
          </div>
        </form>
      </div>
    )
  }

  private renderRow = (index?: number) => {
    if (index === undefined) index = this.state.rows.length

    const cols: FieldData<string>[] = []
    const startIndex = index * COL_COUNT
    const endIndex = (index + 1) * COL_COUNT - 1
    const colsIndexes = [...range(startIndex, endIndex)]

    const { fields } = this._form

    colsIndexes.forEach(index => {
      if (!fields[index])
        this._form.addField({
          name: `${index}`
        })
      cols.push(fields[`${index}`])
    })

    return (
      <div key={index} style={{ marginBottom: 20 }}>
        {cols.map(field => (
          <TextField key={field.name} {...field} />
        ))}
      </div>
    )
  }

  private addRow = () =>
    this.setState(prevState => ({
      rows: [...prevState.rows, this.renderRow()]
    }))
}
