import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './components/Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component{

  updateQuery(query){
    this.setState({results: []});
    if(this.matched(query)){
      BooksAPI.search(query.trim())
      .then((results) => this.setState({results}));
    }else{
      this.setState({results: []});
    }
  }

  matched = (query) => {
    if(query){
      const terms = this.state.searchTerms.filter((term) => term.toLowerCase().startsWith(query))
      console.log(terms)
      if(terms.length < 1){
        return false
      }else{
        return true
      }
    }else{
      return false
    }
  }



  render(){
    const {saveBook} = this.props;
    const {query} = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Book
              books={this.state.results}
              saveBook={saveBook}
            />
          </ol>
        </div>
      </div>
    )
  }

  state = {
    results: [],
    searchTerms: [
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
  }
}

export default Search
