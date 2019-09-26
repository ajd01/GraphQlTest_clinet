import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'
import { flowRight as compose } from 'lodash';

class AddBook extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }
  
  generateAuthorsSelect = () => {
    const data = this.props.getAuthorsQuery
    if (data.loading) {
      return (<div> Loading ... </div> )
    } else {
      return (
        <select onChange={ e => { this.setState({ authorId: e.target.value }) } }>
          <option value=''>Select one...</option>
        {
          data.authors.map(book => {
            return (
              <option key={ book.id } value={ book.id }> { book.name }</option>
            )
          })
        }
        </select>
      )
    }
  }

  submitForm (e) {
    e.preventDefault()
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    })
  }

  render () {
    return (
      <div>
        <h1>Add book:</h1>
        <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
          <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={ e => { this.setState({ name: e.target.value }) } } />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={ e => { this.setState({ genre: e.target.value }) } } />
          </div>
          <div className="field">
            <label>Book name:</label>
            { this.generateAuthorsSelect() }
          </div>
          <input type="submit" value="Add Book"></input>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery'}),
  graphql(addBookMutation, { name: 'addBookMutation'})
)(AddBook)