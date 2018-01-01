import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import SearchBookForm from '../forms/SearchBookForm';
import BookForm from '../forms/BookForm';

class NewBookPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      book: null
    };
  }

  onBookSelect = book => this.setState({ book });

  addBook = () => console.log(`Hii`);

  render() {
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />

        {this.state.book && <BookForm submit={this.addBook} book={this.state.book}/>}
      </Segment>

    );
  }
}

NewBookPage.propTypes = {
  onBookSelect: PropTypes.func.isRequired
};

export default NewBookPage;
