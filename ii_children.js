import React from 'react'
import ReactDOM from 'react-dom'

export function IIHOC(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
      let ren = super.render()
      //Child1 and Child2 are not reconciliated yet, Child*.props.children is null
      return (
        <div>
          <h2>
            HOC
          </h2>
          <div>
            {super.render()}
          </div>
        </div>
      )
    }
  }
}


const Child1 = props => <p>Im a wrapped component 1</p>
class Child2 extends React.Component {
  render() {
    return <p>Im a wrapped component 2</p>
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <h2>
          Wrapped Component
        </h2>
        <Child1/>
        <Child2/>
      </div>
    )
  }
}

const EnhancedExample = IIHOC(Example)

ReactDOM.render(<EnhancedExample/>, document.getElementById('root'))
