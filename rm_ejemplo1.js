import React from 'react'
import ReactDOM from 'react-dom'

class Padre extends React.Component {
  constructor(props) {
    super(props)

    this.name = "Pablo"
    this.childName = "Javier"
  }

  render() {
    const childEl = this.props.children
    const newProps = {name: this.childName}

    const newChildEl = React.cloneElement(childEl, newProps)

    return (
      <div style={{border: "1px solid black", padding: "5px"}}>
        <h1>Hola! Yo soy {this.name}!</h1>
        <div>
          <p>Les presento a mi hijo {this.childName}</p>

          {newChildEl}

        </div>
      </div>
    )
  }
}


class Hijo extends React.Component {
  render() {
    return (
      <div style={{border: "1px solid red", padding: "5px"}}>
        <h2>Hola! Yo soy {this.props.name}</h2>
      </div>
    )
  }
}

ReactDOM.render((
<Padre>
  <Hijo/>
</Padre>
), document.getElementById('root'))
