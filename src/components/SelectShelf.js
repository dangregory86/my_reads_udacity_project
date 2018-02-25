import React, {Component} from 'react'
import PropTypes from 'prop-types'

/* * A componenet to create the options menu for each book. */

class SelectShelf extends Component {

  state = {
    value: 'none'
  }

  static propTypes = {
    saveThisBook: PropTypes.func.isRequired
  }

  handleChange = (event) => {
    event.preventDefault();
    this.updatevalue(event.target.value);
    this.props.saveThisBook(this.props.book, event.target.value);
  }

  updatevalue = (value) => {
    this.setState({value});
  }

  componentDidMount() {
    this.updatevalue(this.props.book.shelf);
  }

  render() {
    return (<div className="book-shelf-changer">
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="none" disabled="disabled">Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>)
  }
}
export default SelectShelf
