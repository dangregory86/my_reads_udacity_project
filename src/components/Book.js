import React, {Component} from 'react'
import SelectShelf from './SelectShelf'
import PropTypes from 'prop-types'

/* * A component to create a book. */
class Book extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  saveThisBook = (book, shelf) => {
    this.props.saveBook(book, shelf);
  }

  render() {

    const {books} = this.props;

    return (<ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <img src={book.imageLinks.thumbnail} alt='The cover' className="book-cover" style={{
                width: 128,
                height: 193
                // backgroundImage: 'url({book.imageLinks.thumbnail})'
              }}/>
            <SelectShelf
              book={book}
              saveThisBook={this.saveThisBook}
            />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
      ))}
  </ol>)
  }
}

export default Book
