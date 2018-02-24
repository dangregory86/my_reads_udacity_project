import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search.js'
import Book from './components/Book'
import {Route, Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  saveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => (
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })
    ));

  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  render() {
    return (<div className="app">
      <Route path='/search' render={({history}) => (
        <Search saveBook={(book, shelf) => {
          this.saveBook(book, shelf)
          history.push('/')
        }}/>
      )}/>
      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <Book
                    saveBook={this.saveBook}
                    books={this.state.books.filter((book) => (book.shelf === "currentlyReading"))}/>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <Book
                    saveBook={this.saveBook}
                    books={this.state.books.filter((book) => (book.shelf === "wantToRead"))}/>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <Book
                    saveBook={this.saveBook}
                    books={this.state.books.filter((book) => (book.shelf === "read"))}/>
                </div>
              </div>
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
