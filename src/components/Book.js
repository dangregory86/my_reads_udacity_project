import React, {Component} from 'react'
import SelectShelf from './SelectShelf'
import PropTypes from 'prop-types'

/* * A component to create a book. */
class Book extends Component {

  static propTypes = {
    books: PropTypes.array
  }

  saveThisBook = (book, shelf) => {
    this.props.saveBook(book, shelf);
  }

  /* @Description. a function to ensure an image is shown even when there is
  *   no cover image available
  *  @Params, {Object} Book
  */
  coverImg = (book) => {
    let image;
    if (book.imageLinks !== undefined) {
      image = book.imageLinks.thumbnail
    } else {
      //image taken from clker.com
      image = 'http://www.clker.com/cliparts/7/e/O/F/z/Y/blank-book-th.png';
    }
    return image;
  }

  render() {

    const {books} = this.props;
    if (!books) {
      return null;
    }

    return (<ol className="books-grid">
      {
        books.map((book) => (<li key={book.title}>
          <div className="book">
            <div className="book-top">
              <img src={this.coverImg(book)} alt='The cover' className="book-cover" style={{
                  width: 128,
                  height: 193
                }}/>
              <SelectShelf book={book} saveThisBook={this.saveThisBook}/>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>))
      }
    </ol>)
  }
}

export default Book
