import React from 'react'
import ReactDOM from 'react-dom'


//function Reform(WrappedComponent) {
  //return class ReformEnhancer extends WrappedComponent {
    //constructor(props) {
      //super(props)
      //this.state = {
        //fields: {}
      //}
    //}
    //render() {
      //let ren = super.render()
      ////let ins = React.createElement(WrappedComponent)
      ////debugger

      //let ren_children2 = React.Children.map(ren.props.children, chi => {
        //if (!chi || chi.type !== 'input') {
          //return chi
        //}
        //const name = chi.props.name;
        //if (!name) {
          //throw "reform requires all form controls to have a unique name attr (unique to the parent form)"
        //}
        //this.state.fields[name] = {
          //onChange: (event) => {
            //this.state.fields[name].value = event.target.value
            //this.forceUpdate()
          //},
          //value: this.state.fields[name] ? this.state.fields[name].value : 'hi fcuker',
          //error: 'something went wrong',
          //valid: false,
          //touched: true
        //}

        //let props = Object.assign({}, chi.props, this.state.fields[name])
        //return React.cloneElement(chi, props, chi.props.children)
      //})

      //let props = Object.assign({}, ren.props, {"data-reform": 'hi fucker', children: null}, {reform: this.state.fields})
      //let ren2 = React.cloneElement(ren, props, ren_children2)
      //return ren2
    //}
  //}
//}


//class Example extends React.Component {
  //constructor(props) {
    //super(props)
  //}
  //render() {
    //const fields = this.state.field;
    //let err;
    //debugger
    //if (fields && fields.nemail && fields.nemail.touched && !fields.nemail.valid ) {
      //err = (<span>{fields.nemail.error}</span>)
    //}
    //return (
      //<form>
        //<input type="email" name="nemail"/>
        //{err}
        //<input type="text" name="something" required/>
      //</form>
    //)
  //}
//}

function Reform(WrappedComponent) {
  return class ReformEnhancer extends WrappedComponent {
    constructor(props) {
      super(props)
      this.state = {
        fields: {}
      }


    }
    render() {
      debugger
      let r = React.createElement(WrappedComponent, Object.assign({},this.props, {ref: 'test'}), null)
      let i = this.refs.test

      return r
    }
  }
}


class Example extends React.Component {
  constructor(props) {
    super(props)
  }
  method() {}
  render() {
    return (
      <form>
        <input type="email" name="nemail"/>
        <input type="text" name="something" required/>
      </form>
    )
  }
}

const EnhancedExample = Reform(Example)
//const EnhancedExample = Example

ReactDOM.render(<EnhancedExample/>, document.getElementById('root'))
ReactDOM.render(<EnhancedExample/>, document.getElementById('root'))
