import React, {Component} from 'react'
import { graphql } from 'react-apollo' 
import { getBookDeailtsQuery } from '../queries/queries'

class BookList extends Component {

  render () {
    if (this.props.data.loading) {
      return (
        <div>Select a Book...</div>
      )
    } else {
      const book = this.props.data.book
      if (book) {
        return (
          <div>
            <h3>Book Details</h3>
            <p> <b>Title:</b> {book.name} </p>
            <p> <b>Genre:</b> {book.genre} </p>
            <p> <b>Author:</b> {book.author.name} </p>
            <p> <b>Author age:</b> {book.author.age} </p>
            <h4>More books about this author</h4>
            <ul>
            {
              book.author.books.map(book => {
                return (
                  <li>
                    { book.name } / { book.genre }
                  </li>
                )
              })
            }
            </ul>
          </div>
        )
      } else {
        return (
          <div>Select a Book...</div>
        )
      }
    }
  }
}

export default graphql(getBookDeailtsQuery,{
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookList)