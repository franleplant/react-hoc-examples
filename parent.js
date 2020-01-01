import React from 'react'
import ReactDOM from 'react-dom'

let d1 = document.createElement('div')
let d2 = document.createElement('div')
const root = document.getElementById('root')
root.appendChild(d1)
root.appendChild(d2)

class Parent extends React.Component {
  render() {
    return (
      <div>
        Parent
        <pre>{JSON.stringify(this.props.children.props, null, 2)}</pre>
      </div>
    )
  }
}


class Child1 extends React.Component {
  render() {
    return (
      <p>React.Component elements wont be resolved at this stage</p>
    )
  }
}

const child2 = props => (
  <div {...props}>
    <p>Dom Elements will be already resolved</p>
  </div>
)

const props = {
  date: (new Date).toISOString()
}

ReactDOM.render((
  <Parent>
    <Child1 {...props}/>
  </Parent>
), d1)

ReactDOM.render((
  <Parent>
    {child2(props)}
  </Parent>
), d2)
