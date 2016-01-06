import React from 'react'
import ReactDOM from 'react-dom'
import { IIHOC as DebuggerHOC, stringify } from './ii_debug'


// Props Proxy and state abstraction demonstration
function PPHOC(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props)
      this.state = { fields: {} }
    }

    getField(fieldName) {
      if (!this.state.fields[fieldName]) {
        this.state.fields[fieldName] = {
          value: '',
          onChange: event => {
            this.state.fields[fieldName].value = event.target.value
            this.forceUpdate()
          }
        }
      }

      return {
        value: this.state.fields[fieldName].value,
        onChange: this.state.fields[fieldName].onChange
      }
    }

    render() {
      const props = Object.assign({}, this.props, {
        fields: this.getField.bind(this),
      })
      return (
        <div>
          <h2>
            PP HOC
          </h2>
          <p>Im a Props Proxy HOC that abstracts controlled inputs</p>
          <WrappedComponent {...props}/>
        </div>
      )
    }
  }
}


class Example extends React.Component {
  render() {
    return (
      <div>
        <h2>
          Wrapped Component
        </h2>
        <p>
          Props
        </p>
        <pre>{stringify(this.props)}</pre>
        <form>
          <label>Automatically controlled input!</label>
          <input type="email" {...this.props.fields('email')}/>
        </form>
      </div>
    )
  }
}

const EnhancedExample = DebuggerHOC(PPHOC(Example))

ReactDOM.render(<EnhancedExample date={(new Date).toISOString()}/>, document.getElementById('root'))
