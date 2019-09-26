import React, {Component} from 'react'
import { graphql } from 'react-apollo' 
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectBook: null
    }
  }

  displayBooks = () => {
    const data = this.props.data
    if (data.loading) {
      return (<div> Loading ... </div> )
    } else {
      return data.books.map(book => {
        return (
          <li key={ book.id } onClick={ e =>{ this.setState({ selectBook: book.id }) } }> { book.name }</li>
        )
      })
    }
  }

  render () {
    return (
      <div>
        <ul id="book.list">
          { this.displayBooks() }
        </ul>
        <BookDetails bookId={ this.state.selectBook } />
      </div>
      
    )
  }
}

export default graphql(getBooksQuery)(BookList)