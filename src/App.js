import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search.js'
import {Route, Link} from 'react-router-dom'
import BookShelf from './components/BookShelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: []
  }

  /* @Description. a function to update the book on the server
  *  @Params, {Object, String} Book, shelf
  */
  saveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    book.shelf = shelf;
    let checkForBook = this.state.books.filter((bookState) => (bookState.id !== book.id));
    checkForBook.push(book);
    this.setState({books: checkForBook})
  }

  /* @Description. a function to get all the books once mounted
  *
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    }).then(() => {
      this.setState({
        shelves: [
          {
            id: 'currentlyReading',
            title: 'Currently Reading'
          }, {
            id: 'wantToRead',
            title: 'Want To Read'
          }, {
            id: 'read',
            title: 'Read'
          }
        ]
      })
    });
  }

  render() {

    const {shelves} = this.state

    return (<div className="app">
      <Route path='/search' render={({history}) => (<Search saveBook={(book, shelf) => {
            this.saveBook(book, shelf)
            history.push('/')
          }} books={this.state.books}/>)}/>
      <Route exact path='/' render={() => (<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {shelves.map((shelf) => (<BookShelf key={shelf.id} books={this.state.books.filter((book) => (book.shelf === shelf.id))} saveBook={this.saveBook} title={shelf.title}/>))}
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>)}/>

    </div>)
  }
}

export default BooksApp
