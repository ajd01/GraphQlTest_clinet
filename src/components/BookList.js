import React, {Component} from 'react'
import { graphql } from 'react-apollo' 
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'
import { Col, Row, Jumbotron, Container, Button } from 'react-bootstrap';

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
          <Button variant="light" key={ book.id } onClick={ e =>{ this.setState({ selectBook: book.id }) } }>
            { book.name }
          </Button>
        )
      })
    }
  }

  render () {
    return (
      <Row>
        <Col lg="6">
          <Jumbotron fluid>
            <Container>
              <h1>List of books</h1>
              { this.displayBooks() }
            </Container>
          </Jumbotron>
        </Col>
        <Col lg="6">
          <BookDetails bookId={ this.state.selectBook } />
        </Col>
      </Row>
    )
  }
}

export default graphql(getBooksQuery)(BookList)