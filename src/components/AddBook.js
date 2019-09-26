import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'
import { flowRight as compose } from 'lodash';
import { Col, Row, Form, Button } from 'react-bootstrap';
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
        <Form.Control as="select" onChange={ e => { this.setState({ authorId: e.target.value }) } }>
          <option value=''>Select one...</option>
          {
            data.authors.map(book => {
              return (
                <option key={ book.id } value={ book.id }> { book.name }</option>
              )
            })
          }
        </Form.Control>
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
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">Add book:</h1>
          <Form id="add-book" onSubmit={ this.submitForm.bind(this) }>
            <Form.Group>
              <Form.Label>Book name:</Form.Label>
              <Form.Control type="text" 
                onChange={ e => { this.setState({ name: e.target.value }) } } 
                placeholder="Enter book name" 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre:</Form.Label>
              <Form.Control type="text" 
                onChange={ e => { this.setState({ genre: e.target.value }) } } 
                placeholder="Enter genre" 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author:</Form.Label>
              { this.generateAuthorsSelect() }
            </Form.Group>
            <Col md={{ span: 6, offset: 3 }}>
              <Button type="submit" variant="primary">Add Book</Button>
            </Col>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery'}),
  graphql(addBookMutation, { name: 'addBookMutation'})
)(AddBook)