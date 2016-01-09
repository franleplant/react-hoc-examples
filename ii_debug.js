import React from 'react'
import ReactDOM from 'react-dom'

function replacer(key, value) {
  if (typeof value === 'function') {
    return `function ${value.name}() {...}`
  }

  return value
}

export function stringify(value) {
  const sj = JSON.stringify(value, replacer, 2).split('\n')
  if (sj.length === 1) {
    return sj.join('\n')
  }
  return sj.slice(1, -1).join('\n')
}

// II debug example
// We are using the Inheritance Inversion technique to display
// the current state and props of the WrappedComponent (the component you want to debug).
// This is based on the technique that Mickael Jackson and Ryan Florence recommend
export function IIHOC(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
      return (
        <div>
          <h2>
            HOC Debugger
          </h2>
          <p>
            Props
          </p>
          <pre>{stringify(this.props)}</pre>
          <p>
            State
          </p>
          <pre>{stringify(this.state)}</pre>
          <div>
            {super.render()}
          </div>
        </div>
      )
    }
  }
}


class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'fran',
      email: 'franleplant@gmail.com'
    }
  }

  render() {
    return (
      <div>
        <h2>
          Wrapped Component
        </h2>
        <p>Im a wrapped component</p>
      </div>
    )
  }
}

const EnhancedExample = IIHOC(Example)

ReactDOM.render(<EnhancedExample date={(new Date).toISOString()} callback={function test() {}}/>, document.getElementById('root'))
