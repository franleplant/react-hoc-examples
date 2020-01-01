import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import lokijs from 'lokijs'
import 'whatwg-fetch'

const url = "https://dataclips.heroku.com/zunkbwvfrypgmzsdwzyhtdiqbyoa-not-reverse-geocoded-features.json"

class T extends React.Component {
  render() {
    const {sortedBy} = this.props
    return (
      <table>
        <thead>
          <tr>
            <th>Total registers {this.props.count}</th>
            <th>Current page {this.props.page}</th>
            <th>Total pages {this.props.pageCount}</th>
          </tr>
          <tr>
            {this.props.fields.map((field,index) => (
              <th key={field + index} onClick={this.props.onSort.bind(null, field, sortedBy.field === field ? !sortedBy.desc : false)}>
                {field} {sortedBy.field === field ? "*": ""} {sortedBy.field === field ? (sortedBy.desc ? "D" : "A") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button onClick={this.props.onPrev}>PREV</button>
              <button onClick={this.props.onNext}>NEXT</button>
              <button onClick={this.props.onPageSelect.bind(null, 1)}>Page 1</button>
            </td>
          </tr>
          {this.props.data.map((row,index) => (
            <tr key={index}>
              {this.props.fields.map((field,index) => <td key={field + index}>{row[field]} </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

}


const PAGE_SIZE = 500;
function SortAndPaginate(WC) {
  return class SortAndPaginateComponent extends React.Component {
    //static propTypes = {
      //data: PropTypes.arrayOf(PropTypes.object).isRequired,
      //fields: PropTypes.arrayOf(PropTypes.string).isRequired,
      //indices: PropTypes.arrayOf(PropTypes.string),
      //pageSize: PropTypes.number
    //}

    //static defaultProps = {
      //indices: [],
      //pageSize: PAGE_SIZE
    //}

    constructor(props) {
      super(props)

      this.col = new lokijs.Collection('data', { indices: this.props.indices })
      this.col.insert(this.props.data)
      this.count = this.col.count()
      this.pageCount = Math.ceil(this.count / this.props.pageSize)

      this.state = {
        page: 0,
        sortBy: {
          field: null,
          desc: null
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      // Naive comparision
      // TODO: improve it
      if (nextProps.data.length !== this.props.data.length) {
        //Cleanup the old col
        this.col.removeDataOnly()
        //Create a new one
        this.col = new lokijs.Collection('data', { indices: nextProps.indices })
        this.col.insert(nextProps.data)
        this.count = this.col.count()
        this.pageCount = Math.ceil(this.count / this.props.pageSize)
      }
    }

    //TODO: onComponentDidUnmount cleanup the database
    componentWillUnmount() {}

    onNext() {
      this.setState({
        page: this.state.page + 1
      })
    }

    onPrev() {
      this.setState({
        page: this.state.page - 1
      })
    }

    onSort(field, desc) {
      this.setState({
        sortBy: {field, desc}
      })
    }

    // Normalize page to arrray enumeration
    onPageSelect(page) {
      this.setState({
        page: page -1
      })
    }

    render() {
      const {page, sortBy, desc} = this.state
      const {pageSize, fields, } = this.props
      // page number starting from 1 to not confuse the user
      const userPage = page + 1;
      const query = this.col.chain()
      const data =
        query
          .find()
          .simplesort(sortBy.field, sortBy.desc)
          .offset(pageSize * page)
          .limit(pageSize)
          .data()


      const props = Object.assign({}, this.props, {
        //Overrides this.props.data
        data: data,
        //Overrides this.props.fields
        fields: fields,
        sortedBy: sortBy,
        page: userPage,
        pageCount: this.pageCount,
        pageSize: pageSize,
        firstPageEnabled: userPage === 1,
        lastPageEnabled: userPage === this.pageCount,
        count: this.count,
        onNext: this.onNext.bind(this),
        onPrev: this.onPrev.bind(this),
        onSort: this.onSort.bind(this),
        onPageSelect: this.onPageSelect.bind(this),
        //Overrides this.props.indices
        indices: null
      })


      return (
        <WC {...props}/>
      )
    }
  }
}

const ET = SortAndPaginate(T)
fetch(url)
  .then(res => res.json())
  .then(res => {
    const nData = res.values.map(row => {
      let rowObj = {}
      res.fields.forEach((field, index) => rowObj[field] = row[index] )
      return rowObj
    })
    const fields = res.fields;

    ReactDOM.render( <ET data={nData} fields={fields} pageSize={PAGE_SIZE}/>,
      document.getElementById('root')
    )
  })




