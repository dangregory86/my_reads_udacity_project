import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './components/Book'
import * as BooksAPI from './BooksAPI'

const searchTerms = [
  'Android',
  'Art',
  'Artificial Intelligence',
  'Astronomy',
  'Austen',
  'Baseball',
  'Basketball',
  'Bhagat',
  'Biography',
  'Brief',
  'Business',
  'Camus',
  'Cervantes',
  'Christie',
  'Classics',
  'Comics',
  'Cook',
  'Cricket',
  'Cycling',
  'Desai',
  'Design',
  'Development',
  'Digital Marketing',
  'Drama',
  'Drawing',
  'Dumas',
  'Education',
  'Everything',
  'Fantasy',
  'Film',
  'Finance',
  'First',
  'Fitness',
  'Football',
  'Future',
  'Games',
  'Gandhi',
  'Homer',
  'Horror',
  'Hugo',
  'Ibsen',
  'Journey',
  'Kafka',
  'King',
  'Lahiri',
  'Larsson',
  'Learn',
  'Literary Fiction',
  'Make',
  'Manage',
  'Marquez',
  'Money',
  'Mystery',
  'Negotiate',
  'Painting',
  'Philosophy',
  'Photography',
  'Poetry',
  'Production',
  'Programming',
  'React',
  'Redux',
  'River',
  'Robotics',
  'Rowling',
  'Satire',
  'Science Fiction',
  'Shakespeare',
  'Singh',
  'Swimming',
  'Tale',
  'Thrun',
  'Time',
  'Tolstoy',
  'Travel',
  'Ultimate',
  'Virtual Reality',
  'Web Development',
  'iOS'
]

class Search extends Component {

  /* @Description. a function to keep update the result state
  *  @Params, {String} query
  */
  updateQuery(query) {
    this.setState({results: []});
    if (this.matched(query)) {
      BooksAPI.search(query.trim()).then((results) => (this.checkIfSaved(results)));
    } else {
      this.setState({results: []});
    }
  }

  /* @Description. a function to check if the book is already shelved
  * @Params. {Object} results
  */
  checkIfSaved = (results) => {
    let notSaved = results.filter(nb => !this.props.books.some(ob => nb.id === ob.id));
    let alreadySaved = this.props.books.filter(ob => results.some(nb => ob.id === nb.id));
    // return notSaved;
    this.setState((state) => {
      state.results = state.results.concat(notSaved);
      state.results = state.results.concat(alreadySaved);
      return state;
    })
  }

  /* @Description. a function to ensure only the provided searchterms can be used
  *  @Params, {String} query
  */
  matched = (query) => {
    if (query) {
      const terms = searchTerms.filter((term) => term.toLowerCase().startsWith(query.toLowerCase()))
      if (terms.length < 1) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  render() {
    const {saveBook} = this.props;
    const {query} = this.state;

    return (<div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          <Book books={this.state.results} saveBook={saveBook}/>
        </ol>
      </div>
    </div>)
  }

  state = {
    results: []
  }
}

export default Search
