import React from 'react'
import ReactDOM from 'react-dom'

function FosterByPablo(Child) {
  return class Padre extends React.Component {
    constructor(props) {
      super(props)

      this.name = "Pablo"
      this.childName = "Javier"

      this.state = {
        address: "Avenida Siempre Viva 123"
      }
    }

    onMove() {
      this.setState({
        address: "221B Baker Street"
      })
    }

    render() {
      return (
        <div style={{border: "5px solid black", padding: "5px"}}>
          <h1>
            Hola! Yo soy {this.name}!
            <button onClick={this.onMove.bind(this)}>Mudar</button>
          </h1>
          <div>
            <p>Vivo en {this.state.address}</p>
            <p>Les presento a mi hijo {this.childName}</p>

            <Child name={this.childName} address={this.state.address}/>

          </div>
        </div>
      )
    }
  }
}

class Hijo extends React.Component {
  render() {
    return (
      <div style={{border: "5px solid red", padding: "5px"}}>
        <h2>Hola! Yo soy {this.props.name}</h2>
        <p>Vivo en {this.props.address}</p>
      </div>
    )
  }
}


const FosteredJavier = FosterByPablo(Hijo)

ReactDOM.render((
  <FosteredJavier />
), document.getElementById('root'))
