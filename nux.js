import ReactDOM from 'react-dom'
import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'




const App = props => (
  <div>
    <h1>Im App</h1>
    {props.children}
  </div>
)

const About = props => (
  <div>
    <h2>Im About</h2>
  </div>
)

const Users = props => (
  <div>
    <h2>Im Users</h2>
  </div>
)


class Nux extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }


  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="about" component={About}/>
          <Route path="users" component={Users}/>
        </Route>
      </Router>
    )
  }
}




ReactDOM.render((
<Nux/>
), document.getElementById('root'))
